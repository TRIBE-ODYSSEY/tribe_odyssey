import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '@src/components/common/Button';
import { useAccount, useSignMessage } from 'wagmi';
import { randomPicker } from '../services/randomPicker';
import { 
  Raffle, 
  RaffleCondition, 
  RaffleFormData
} from '../types';

interface RaffleFormModalProps {
  raffle?: Raffle | null;
  onClose: () => void;
  onSubmit: (formData: RaffleFormData) => Promise<void>;
}

const RaffleFormModal: React.FC<RaffleFormModalProps> = ({
  raffle,
  onClose,
  onSubmit
}) => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<RaffleFormData>({
    title: raffle?.title || '',
    description: raffle?.description || '',
    prizeValue: raffle?.prizeValue || '',
    endDate: raffle?.endDate || '',
    conditions: raffle?.conditions || [{ entry: 1, points: 1 }],
    onlyAllowOnce: raffle?.onlyAllowOnce || false
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Get nonce for signature
      const { data: { nonce } } = await randomPicker.getNonce(address);
      
      // Sign message
      const signature = await signMessageAsync({
        message: `Creating raffle with nonce: ${nonce}`
      });

      // Validate required fields
      if (!formData.title || !formData.description) {
        throw new Error('Please fill in all required fields');
      }

      // Validate end date
      if (new Date(formData.endDate) < new Date()) {
        throw new Error('End date must be in the future');
      }

      // Submit with signature
      await onSubmit({
        ...formData,
        signature
      });

      toast.success(raffle ? 'Raffle updated successfully' : 'Raffle created successfully');
      onClose();
    } catch (error: unknown) {
      console.error('Failed to submit raffle:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit raffle');
    } finally {
      setIsSubmitting(false);
    }
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

  const updateCondition = (index: number, field: keyof RaffleCondition, value: number) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.map((condition, i) => 
        i === index ? { ...condition, [field]: value } : condition
      )
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-gray-900 rounded-xl border border-white/10 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-semibold text-white mb-6">
          {raffle ? 'Edit Raffle' : 'Create New Raffle'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-white/60 mb-2">Title *</label>
              <input
                name="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                placeholder="Enter raffle title"
              />
            </div>

            <div>
              <label className="block text-white/60 mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white h-32"
                placeholder="Enter raffle description"
              />
            </div>

            <div>
              <label className="block text-white/60 mb-2">Prize Value *</label>
              <input
                name="prizeValue"
                type="text"
                value={formData.prizeValue}
                onChange={(e) => setFormData(prev => ({ ...prev, prizeValue: e.target.value }))}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                placeholder="e.g. $1000"
              />
            </div>

            <div>
              <label className="block text-white/60 mb-2">End Date *</label>
              <input
                name="endDate"
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-white/60">Entry Conditions</label>
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
                      <label className="block text-white/60 mb-2">Points Required</label>
                      <input
                        type="number"
                        value={condition.points}
                        onChange={(e) => updateCondition(index, 'points', parseInt(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 mb-2">Entries Granted</label>
                      <input
                        type="number"
                        value={condition.entry}
                        onChange={(e) => updateCondition(index, 'entry', parseInt(e.target.value))}
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

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.onlyAllowOnce}
                onChange={(e) => setFormData(prev => ({ ...prev, onlyAllowOnce: e.target.checked }))}
                className="mr-2"
              />
              <label className="text-white/60">
                Only allow each user to enter once
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              {isSubmitting ? 'Submitting...' : raffle ? 'Update Raffle' : 'Create Raffle'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default RaffleFormModal;