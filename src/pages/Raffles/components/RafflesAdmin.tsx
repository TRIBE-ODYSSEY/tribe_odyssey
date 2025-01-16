import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useAccount, useSignMessage } from 'wagmi';
import { randomPicker } from '../services/randomPicker';
import PageTitle from '@src/components/common/PageTitle';
import Button from '@src/components/common/Button';
import RaffleFormModal from './RaffleFormModal';
import { RaffleDetails } from '../types/Raffle.types';

const RafflesAdmin: FC = () => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRaffle, setSelectedRaffle] = useState<RaffleDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [raffles, setRaffles] = useState<RaffleDetails[]>([]);

  useEffect(() => {
    if (address) {
      fetchRaffles();
    }
  }, [address]);

  const fetchRaffles = async () => {
    try {
      setLoading(true);
      const nonce = await randomPicker.getNonce(address!);
      const signature = await signMessageAsync({
        message: `I am signing my one-time nonce: ${nonce}`,
      });
      
      const response = await randomPicker.getProjects();
      if (response.success) {
        setRaffles(response.data.map(raffle => ({
          ...raffle,
          signature
        })));
      }
    } catch (error) {
      toast.error('Failed to fetch raffles');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRaffle = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this raffle?')) return;

    try {
      const response = await randomPicker.deleteProject(id);
      if (response.success) {
        toast.success('Raffle deleted successfully');
        fetchRaffles();
      }
    } catch (error) {
      toast.error('Failed to delete raffle');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <PageTitle>Raffle Admin</PageTitle>

      <div className="flex justify-end mb-8">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create New Raffle
        </Button>
      </div>

      <div className="grid gap-6">
        {raffles.map((raffle) => (
          <motion.div
            key={raffle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {raffle.project_name}
                </h3>
                <p className="text-gray-400">
                  Status: {raffle.project_status}
                </p>
                <p className="text-gray-400">
                  Created: {moment(raffle.raffle_at).format('MMM D, YYYY')}
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    setSelectedRaffle(raffle);
                    setIsModalOpen(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteRaffle(raffle.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <RaffleFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRaffle(null);
        }}
        onSubmit={async (data) => {
          try {
            if (selectedRaffle) {
              await randomPicker.updateProject(selectedRaffle.id, data);
              toast.success('Raffle updated successfully');
            } else {
              await randomPicker.createProject(data);
              toast.success('Raffle created successfully');
            }
            setIsModalOpen(false);
            setSelectedRaffle(null);
            fetchRaffles();
          } catch (error) {
            toast.error('Failed to save raffle');
          }
        }}
        initialData={selectedRaffle}
        mode={selectedRaffle ? 'edit' : 'create'}
      />
    </motion.div>
  );
};

export default RafflesAdmin;