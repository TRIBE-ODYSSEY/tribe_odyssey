import React, { useState, FormEvent } from 'react';
import { IRaffleDetails, RaffleInput } from '../types';

interface RaffleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RaffleInput) => Promise<void>;
  initialData?: IRaffleDetails | null;
  mode: 'create' | 'edit';
}

const RaffleFormModal: React.FC<RaffleFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode
}) => {
  const [formData, setFormData] = useState<RaffleInput>(
    initialData ? {
      displayName: initialData.project_name,
      conditions: initialData.conditions,
      publicResults: initialData.publicResults,
      website: initialData.website,
      prizeCount: 1,
      prizeName: ''
    } : {
      displayName: '',
      conditions: [],
      publicResults: false,
      website: '',
      prizeCount: 1,
      prizeName: ''
    }
  );

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6">
          {mode === 'create' ? 'Create New Raffle' : 'Edit Raffle'}
        </h2>

        <form onSubmit={handleSubmitForm} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Display Name
            </label>
            <input
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              className="w-full bg-gray-700 rounded-lg p-3"
              placeholder="Enter raffle name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Website
            </label>
            <input
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full bg-gray-700 rounded-lg p-3"
              placeholder="Enter website URL"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Prize Count
            </label>
            <input
              type="number"
              value={formData.prizeCount}
              onChange={(e) => setFormData({ ...formData, prizeCount: parseInt(e.target.value) })}
              className="w-full bg-gray-700 rounded-lg p-3"
              placeholder="Enter number of prizes"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Prize Name
            </label>
            <input
              value={formData.prizeName}
              onChange={(e) => setFormData({ ...formData, prizeName: e.target.value })}
              className="w-full bg-gray-700 rounded-lg p-3"
              placeholder="Enter prize name"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.publicResults}
              onChange={(e) => setFormData({ ...formData, publicResults: e.target.checked })}
              className="mr-2"
            />
            <label className="text-sm">
              Show results publicly
            </label>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {mode === 'create' ? 'Create Raffle' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RaffleFormModal;
