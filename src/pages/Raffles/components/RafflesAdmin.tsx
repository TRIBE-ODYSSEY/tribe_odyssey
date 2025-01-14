// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAccount, useSignMessage } from 'wagmi';
import { toast } from 'react-toastify';
import PageLayout from '@src/components/common/layout/PageLayout';
import PageTitle from '@src/components/common/PageTitle';
import Button from '@src/components/common/Button';
import { randomPicker } from '../services/randomPicker';
import { 
  Raffle, 
  CreateRaffleInput, 
  RaffleCondition, 
  RaffleResponse 
} from '@src/lib/types/raffle';

const RafflesAdmin: React.FC = () => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const navigate = useNavigate();
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<CreateRaffleInput>({
    title: '',
    description: '',
    prizeValue: '',
    endDate: '',
    image: null as unknown as File,
    conditions: [{ entry: 1, points: 1 }],
    onlyAllowOnce: false
  });
  const [imagePreview, setImagePreview] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ADMIN_ADDRESSES = [
    '0xc570F1B8D14971c6cd73eA8db4F7C44E4AAdC6f2',
  ];

  const isAdmin = address && ADMIN_ADDRESSES.map(addr => addr.toLowerCase())
    .includes(address.toLowerCase());

  useEffect(() => {
    if (isAdmin) {
      fetchRaffles();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return <Navigate to="/404" replace />;
  }

  const fetchRaffles = async () => {
    try {
      setIsLoading(true);
      const response = await randomPicker.getActiveRaffles();
      if ('data' in response) {
        setRaffles(response.data as Raffle[]);
      }
    } catch (error) {
      console.error('Failed to fetch raffles:', error);
      toast.error('Failed to load raffles');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConditionChange = (index: number, field: keyof RaffleCondition, value: number) => {
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
      conditions: [...prev.conditions, { entry: 1, points: 1 }]
    }));
  };

  const removeCondition = (index: number) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return false;
    }
    if (!formData.description.trim()) {
      toast.error('Description is required');
      return false;
    }
    if (!formData.prizeValue.trim()) {
      toast.error('Prize value is required');
      return false;
    }
    if (!formData.endDate) {
      toast.error('End date is required');
      return false;
    }
    if (!formData.image) {
      toast.error('Image is required');
      return false;
    }
    if (formData.conditions.length === 0) {
      toast.error('At least one condition is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      // Get nonce for signature
      const { data: { nonce } } = await randomPicker.getNonce(address!);
      
      // Sign message
      const signature = await signMessageAsync({
        message: `Creating raffle with title: ${formData.title}. Nonce: ${nonce}`
      });

      const response: RaffleResponse = await randomPicker.createRaffle({
        ...formData,
        signature
      });

      if (response.success) {
        toast.success('Raffle created successfully!');
        navigate('/raffles');
      } else {
        throw new Error(response.error || 'Failed to create raffle');
      }
    } catch (error: any) {
      console.error('Submit error:', error);
      toast.error(error.message || 'Failed to create raffle');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <PageTitle>Raffle Administration</PageTitle>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Image Upload */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Create New Raffle</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Prize Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/10 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-lg" />
                      ) : (
                        <div className="flex flex-col items-center">
                          <svg className="mx-auto h-12 w-12 text-white/60" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div className="text-sm text-white/60">Upload a file</div>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer text-red-400 hover:text-red-300"
                      >
                        Choose file
                      </label>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Prize Value
                    </label>
                    <input
                      type="text"
                      name="prizeValue"
                      value={formData.prizeValue}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      End Date
                    </label>
                    <input
                      type="datetime-local"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Entry Conditions
                    </label>
                    {formData.conditions.map((condition, index) => (
                      <div key={index} className="flex gap-4 mb-4">
                        <input
                          type="number"
                          placeholder="Points Required"
                          value={condition.points}
                          onChange={(e) => handleConditionChange(index, 'points', parseInt(e.target.value))}
                          className="w-1/2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                          min="1"
                          required
                        />
                        <input
                          type="number"
                          placeholder="Entries Granted"
                          value={condition.entry}
                          onChange={(e) => handleConditionChange(index, 'entry', parseInt(e.target.value))}
                          className="w-1/2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                          min="1"
                          required
                        />
                        {index > 0 && (
                          <Button
                            type="button"
                            onClick={() => removeCondition(index)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={addCondition}
                      className="mt-2 bg-purple-500 hover:bg-purple-600"
                    >
                      Add Condition
                    </Button>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="onlyAllowOnce"
                      name="onlyAllowOnce"
                      checked={formData.onlyAllowOnce}
                      onChange={(e) => setFormData(prev => ({ ...prev, onlyAllowOnce: e.target.checked }))}
                      className="h-4 w-4 text-red-500 focus:ring-red-400 border-white/10 rounded"
                    />
                    <label htmlFor="onlyAllowOnce" className="ml-2 text-sm text-white/60">
                      Only allow one entry per wallet
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Raffle'}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default RafflesAdmin;