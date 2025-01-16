import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useRaffleActions } from '../hooks/useRaffleActions';
import useRaffles from '../hooks/useRaffles';
import { useRaffleContext } from '../context/RaffleContext';
import { RaffleDetails } from '../types/Raffle.types';

// Components
import PageTitle from '@src/components/common/PageTitle';
import { Spinner } from 'flowbite-react';
import RaffleCard from './common/RaffleCard';

const RafflesOpened: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { refreshTrigger } = useRaffleContext();
  const { raffles, loading } = useRaffles(true, refreshTrigger);
  const { enterRaffle } = useRaffleActions();
  
  const [loadingIndex, setLoadingIndex] = useState(-1);

  const handleEnterRaffle = async (raffleId: string, points: number, index: number) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    setLoadingIndex(index);
    try {
      const success = await enterRaffle(raffleId, points);
      if (success) {
        navigate(`/${raffleId}`);
      }
    } finally {
      setLoadingIndex(-1);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <PageTitle>Active Raffles</PageTitle>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {Array.isArray(raffles) && raffles.map((raffle: RaffleDetails, index: number) => (
          <RaffleCard
            key={raffle.id}
            raffle={raffle}
            isLoading={loadingIndex === index}
            onEnter={(points) => handleEnterRaffle(raffle.id, points, index)}
            onClick={() => navigate(`/${raffle.id}`)}
          />
        ))}
        
        {(!Array.isArray(raffles) || raffles.length === 0) && (
          <div className="col-span-full text-center text-gray-400 py-12">
            No active raffles at the moment
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RafflesOpened;