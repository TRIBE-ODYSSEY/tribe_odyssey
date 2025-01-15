import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAccount, useSignMessage } from 'wagmi';
import { toast } from 'react-toastify';

import PageLayout from '@src/components/common/layout/PageLayout';
import PageTitle from '@src/components/common/PageTitle';
import Button from '@src/components/common/Button';
import { randomPicker } from '../services/randomPicker';
import { 
  CreateRaffleInput, 
  RaffleCondition, 
  RaffleResponse 
} from '../types';

const RafflesAdmin: React.FC = () => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const navigate = useNavigate();
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

  if (!isAdmin) {
    return <Navigate to="/404" replace />;
  }

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
        signature,
        displayName: formData.title,
        publicResults: true,
        website: '',
        prizeCount: 1,
        prizeName: formData.prizeValue,
        conditions: JSON.stringify(formData.conditions)
      });

      if ('success' in response && response.success) {
        toast.success('Raffle created successfully!');
        navigate('/raffles');
      } else {
        throw new Error(response.error || 'Failed to create raffle');
      }
    } catch (error: unknown) {
      console.error('Submit error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create raffle');
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
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Create New Raffle</h3>
              
              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Prize Image
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Choose Image
                    </label>
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
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
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                    placeholder="Enter raffle title"
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
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                    rows={4}
                    placeholder="Enter raffle description"
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
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                    placeholder="Enter prize value"
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
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  />
                </div>

                {/* Conditions */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium text-white/60">
                      Entry Conditions
                    </label>
                    <button
                      type="button"
                      onClick={addCondition}
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Add Condition
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {formData.conditions.map((condition, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white/60 mb-2">
                            Points Required
                          </label>
                          <input
                            type="number"
                            value={condition.points}
                            onChange={(e) => handleConditionChange(index, 'points', parseInt(e.target.value))}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                            min="1"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white/60 mb-2">
                            Entries Granted
                          </label>
                          <input
                            type="number"
                            value={condition.entry}
                            onChange={(e) => handleConditionChange(index, 'entry', parseInt(e.target.value))}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                            min="1"
                          />
                        </div>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeCondition(index)}
                            className="mt-8 text-red-400 hover:text-red-300 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Only Allow Once */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="onlyAllowOnce"
                    checked={formData.onlyAllowOnce}
                    onChange={(e) => setFormData(prev => ({ ...prev, onlyAllowOnce: e.target.checked }))}
                    className="mr-2"
                  />
                  <label className="text-sm font-medium text-white/60">
                    Only allow each user to enter once
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                {isSubmitting ? 'Creating...' : 'Create Raffle'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default RafflesAdmin;