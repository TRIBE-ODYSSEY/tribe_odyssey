import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RaffleDetails, RaffleInput, RaffleCondition } from '../types/Raffle.types';
import Button from '@src/components/common/Button';
import { useAccount } from 'wagmi';
import { raffleService } from '@src/services/RaffleService';

interface RaffleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RaffleInput) => Promise<void>;
  initialData?: RaffleDetails | null;
  mode: 'create' | 'edit';
}

const RaffleFormModal: React.FC<RaffleFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode
}) => {
  const { address } = useAccount();
  const [formData, setFormData] = useState<RaffleInput>(() => ({
    project_name: initialData?.project_name || '',
    prize_name: initialData?.prize_name || '',
    prize_image: initialData?.prize_image || '',
    nft_id: initialData?.nft_id || '',
    raffle_at: initialData?.raffle_at || '',
    endDate: initialData?.endDate || '',
    conditions: initialData?.conditions || [{ points: 100, entry: 1 }],
    publicResults: initialData?.publicResults ?? true,
    website: initialData?.website || '',
    project_description: initialData?.project_description || '',
    min_points: initialData?.min_points || 0,
    max_entries_per_user: initialData?.max_entries_per_user || 0,
    signature: '',
    nonce: '',
    adminAddress: ''
  }));

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!address) return;

    setIsSubmitting(true);
    try {
      const nonce = await raffleService.getNonce(address);
      const signature = await raffleService.createAdminSignatureMessage(
        mode === 'create' ? 'Create Raffle' : 'Edit Raffle',
        { ...formData, adminAddress: address },
        nonce
      );

      await onSubmit({
        ...formData,
        signature,
        nonce,
        adminAddress: address
      });
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addCondition = () => {
    setFormData({
      ...formData,
      conditions: [...formData.conditions, { points: 100, entry: 1 }]
    });
  };

  const removeCondition = (index: number) => {
    setFormData({
      ...formData,
      conditions: formData.conditions.filter((_, i) => i !== index)
    });
  };

  const updateCondition = (index: number, field: keyof RaffleCondition, value: number) => {
    const newConditions = [...formData.conditions];
    newConditions[index] = { ...newConditions[index], [field]: value };
    setFormData({ ...formData, conditions: newConditions });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-gray-800 rounded-lg p-8 w-full max-w-2xl m-4"
        >
          <h2 className="text-2xl font-semibold mb-6">
            {mode === 'create' ? 'Create New Raffle' : 'Edit Raffle'}
          </h2>

          <form onSubmit={handleSubmitForm} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Display Name
              </label>
              <input
                value={formData.project_name}
                onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                className="w-full bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter raffle name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Prize Name
              </label>
              <input
                value={formData.prize_name}
                onChange={(e) => setFormData({ ...formData, prize_name: e.target.value })}
                className="w-full bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter prize name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Entry Conditions</label>
                <Button
                  type="button"
                  onClick={addCondition}
                  className="text-sm px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
                >
                  Add Condition
                </Button>
              </div>
              <div className="space-y-3">
                {formData.conditions.map((condition, index) => (
                  <div key={index} className="flex gap-4 items-center bg-gray-700 p-3 rounded-lg">
                    <div className="flex-1">
                      <label className="text-xs text-gray-400 mb-1 block">Points</label>
                      <input
                        type="number"
                        value={condition.points}
                        onChange={(e) => updateCondition(index, 'points', parseInt(e.target.value))}
                        className="w-full bg-gray-600 rounded p-2"
                        min="1"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-gray-400 mb-1 block">Entries</label>
                      <input
                        type="number"
                        value={condition.entry}
                        onChange={(e) => updateCondition(index, 'entry', parseInt(e.target.value))}
                        className="w-full bg-gray-600 rounded p-2"
                        min="1"
                        required
                      />
                    </div>
                    {formData.conditions.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeCondition(index)}
                        className="text-red-500 hover:text-red-400 mt-5"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.publicResults}
                onChange={(e) => setFormData({ ...formData, publicResults: e.target.checked })}
                className="mr-2 rounded bg-gray-700 border-gray-600"
              />
              <label className="text-sm">
                Show results publicly
              </label>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <Button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Raffle' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RaffleFormModal;
