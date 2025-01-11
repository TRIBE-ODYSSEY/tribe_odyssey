import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useSignMessage } from 'wagmi';
import { toast } from 'react-toastify';
import moment from 'moment';
import PageLayout from '@src/components/common/layout/PageLayout';
import PageTitle from '@src/components/common/PageTitle';
import Button from '@src/components/common/Button';
import { randomPicker } from '@src/lib/services/randomPicker';
import { motion } from 'framer-motion';

const ADMIN_ADDRESSES = [
  '0xc570F1B8D14971c6cd73eA8db4F7C44E4AAdC6f2',
  // Add other admin addresses here
];

const RafflesAdmin: React.FC = () => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const navigate = useNavigate();
  const [raffles, setRaffles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prizeValue: '',
    endDate: '',
    conditions: [{ entry: 0, points: 0 }],
    onlyAllowOnce: false
  });
  const [image, setImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string>();

  useEffect(() => {
    if (!address || !ADMIN_ADDRESSES.includes(address)) {
      toast.error('Unauthorized access');
      navigate('/raffles');
      return;
    }
    fetchRaffles();
  }, [address, navigate]);

  const fetchRaffles = async () => {
    try {
      setIsLoading(true);
      const response = await randomPicker.getActiveRaffles();
      setRaffles(response);
    } catch (error) {
      console.error('Failed to fetch raffles:', error);
      toast.error('Failed to load raffles');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConditionChange = (index: number, field: 'entry' | 'points', value: number) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.map((condition, i) => 
        i === index ? { ...condition, [field]: value } : condition
      )
    }));
  };

  const addCondition = () => {
    setFormData(prev => ({
      ...prev,
      conditions: [...prev.conditions, { entry: 0, points: 0 }]
    }));
  };

  const removeCondition = (index: number) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!address) {
        toast.error('Please connect wallet');
        return;
      }

      if (!image) {
        toast.error('Please select an image');
        return;
      }

      const { data: { nonce } } = await randomPicker.getNonce(address);
      const signature = await signMessageAsync({
        message: `I am signing my one-time nonce: ${nonce}`
      });

      await randomPicker.createRaffle({
        ...formData,
        image,
        signature,
        address
      });

      toast.success('Raffle created successfully!');
      navigate('/raffles');
    } catch (error: any) {
      console.error('Submit error:', error);
      toast.error(error.message || 'Failed to create raffle');
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <PageTitle>Raffle Administration</PageTitle>

          <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Create New Raffle</h2>

            <div className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Prize Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/10 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-lg" />
                    ) : (
                      <svg className="mx-auto h-12 w-12 text-white/60" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    <div className="flex text-sm text-white/60">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-red-400 hover:text-red-300">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Prize Value */}
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Prize Value
                </label>
                <input
                  type="text"
                  name="prizeValue"
                  value={formData.prizeValue}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  End Date
                </label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Entry Conditions */}
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Entry Conditions
                </label>
                {formData.conditions.map((condition, index) => (
                  <div key={index} className="flex gap-4 mb-4">
                    <input
                      type="number"
                      placeholder="Entry"
                      value={condition.entry}
                      onChange={(e) => handleConditionChange(index, 'entry', parseInt(e.target.value))}
                      className="w-1/2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Points"
                      value={condition.points}
                      onChange={(e) => handleConditionChange(index, 'points', parseInt(e.target.value))}
                      className="w-1/2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    {index > 0 && (
                      <button
                        onClick={() => removeCondition(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <Button
                  onClick={addCondition}
                  className="mt-2"
                >
                  Add Condition
                </Button>
              </div>

              {/* Only Allow Once */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="onlyAllowOnce"
                  checked={formData.onlyAllowOnce}
                  onChange={(e) => setFormData(prev => ({ ...prev, onlyAllowOnce: e.target.checked }))}
                  className="h-4 w-4 text-red-500 focus:ring-red-500 border-white/10 rounded"
                />
                <label className="ml-2 block text-sm text-white/60">
                  Only allow each user to enter once
                </label>
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full"
              >
                Create Raffle
              </Button>
            </div>
          </div>

          {/* Active Raffles List */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-white mb-6">Active Raffles</h2>
            
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500" />
              </div>
            ) : (
              <div className="grid gap-6">
                {raffles.map((raffle) => (
                  <motion.div
                    key={raffle.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{raffle.title}</h3>
                        <p className="text-white/60 mt-1">{raffle.description}</p>
                        <p className="text-white/60 mt-1">Ends: {moment(raffle.endDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => navigate(`/raffles/${raffle.id}/edit`)}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => {/* handle finish */}}
                        >
                          Finish
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default RafflesAdmin;