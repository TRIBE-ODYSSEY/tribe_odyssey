import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { randomPicker } from '../services/randomPicker';
import { IRaffleDetails, ApiResponse } from '../types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ADMIN_ADDRESSES = [
  '0xc570F1B8D14971c6cd73eA8db4F7C44E4AAdC6f2',
  '0xf7D579d80C6e01382D7BAa122B78310361122B5b'
].map(addr => addr.toLowerCase());

type RaffleStatus = 'active' | 'completed' | 'draft';

interface RaffleFilters {
  status: RaffleStatus;
}

const RafflesAdmin: React.FC = () => {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();
  const [raffles, setRaffles] = useState<IRaffleDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<RaffleFilters>({
    status: 'active'
  });

  // Check if user is admin
  const isAdmin = address && ADMIN_ADDRESSES.includes(address.toLowerCase());

  useEffect(() => {
    if (!isConnected || !isAdmin) {
      navigate('/raffles');
      return;
    }

    fetchRaffles();
  }, [isConnected, isAdmin, filters]);

  const fetchRaffles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: ApiResponse<IRaffleDetails[]> = await randomPicker.getProjectDetails(filters.status);
      
      if (response.success) {
        setRaffles(response.data);
      } else {
        toast.error(response.error || 'Failed to fetch raffles');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (status: RaffleStatus) => {
    setFilters(prev => ({ ...prev, status }));
  };

  const handleDeleteRaffle = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this raffle?')) return;

    try {
      const response = await randomPicker.deleteProject(id);
      if (response.success) {
        setRaffles(prev => prev.filter(raffle => raffle.id !== id));
        toast.success('Raffle deleted successfully');
      } else {
        toast.error(response.error || 'Failed to delete raffle');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete raffle';
      toast.error(errorMessage);
    }
  };

  const handleEditRaffle = (id: string) => {
    navigate(`/raffles/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
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
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Raffles Admin</h1>
        <button
          onClick={() => navigate('/raffles/create')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create New Raffle
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-4 mb-8">
        <div className="flex gap-4">
          {(['active', 'completed', 'draft'] as RaffleStatus[]).map(status => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filters.status === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Raffles List */}
      <div className="space-y-4">
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        {raffles.map(raffle => (
          <motion.div
            key={raffle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-6 flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">{raffle.project_name}</h2>
              <div className="flex gap-4 text-gray-300">
                <span>Status: {raffle.project_status}</span>
                <span>Entries: {raffle.entry_count}</span>
                <span>Prize: #{raffle.nft_id}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleEditRaffle(raffle.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteRaffle(raffle.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}

        {raffles.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No raffles found
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RafflesAdmin;