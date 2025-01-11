import React from 'react';
import { motion } from 'framer-motion';
import Button from '@src/components/common/Button';

interface RaffleData {
  id: string;
  title: string;
  description: string;
  endDate: Date;
  prizeImage: string;
  totalTickets: number;
  ticketsSold: number;
  prizeValue: string;
  ticketPrice: string;
  status: 'active' | 'completed' | 'draft';
}

interface RaffleFormModalProps {
  raffle?: RaffleData | null;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
}

const RaffleFormModal: React.FC<RaffleFormModalProps> = ({
  raffle,
  onClose,
  onSubmit
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await onSubmit(formData);
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
        className="bg-gray-900 rounded-xl border border-white/10 p-6 w-full max-w-2xl"
      >
        <h2 className="text-2xl font-semibold text-white mb-6">
          {raffle ? 'Edit Raffle' : 'Create New Raffle'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/60 mb-2">Title</label>
              <input
                name="title"
                type="text"
                defaultValue={raffle?.title}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-white/60 mb-2">Prize Value</label>
              <input
                name="prizeValue"
                type="text"
                defaultValue={raffle?.prizeValue}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-white/60 mb-2">Ticket Price</label>
              <input
                name="ticketPrice"
                type="text"
                defaultValue={raffle?.ticketPrice}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-white/60 mb-2">Total Tickets</label>
              <input
                name="totalTickets"
                type="number"
                defaultValue={raffle?.totalTickets}
                required
                min="1"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-white/60 mb-2">End Date</label>
              <input
                name="endDate"
                type="datetime-local"
                defaultValue={raffle?.endDate.toISOString().slice(0, 16)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-white/60 mb-2">Prize Image URL</label>
              <input
                name="prizeImage"
                type="url"
                defaultValue={raffle?.prizeImage}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/60 mb-2">Description</label>
            <textarea
              name="description"
              defaultValue={raffle?.description}
              required
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button className="bg-gray-500 hover:bg-gray-600" onClick={onClose}>
              Cancel
            </Button>
            <Button className="bg-primary hover:bg-primary-dark">
              {raffle ? 'Save Changes' : 'Create Raffle'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default RaffleFormModal;