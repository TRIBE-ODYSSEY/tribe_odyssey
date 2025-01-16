import React from 'react';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useRaffleContext } from '../context/RaffleContext';
import useWinners from '../hooks/useWinners';
import PageTitle from '@src/components/common/PageTitle';
import { Spinner } from 'flowbite-react';
import NetworkErrors, { ErrorTypes } from '@src/components/common/errors/network/NetworkErrors';
import { randomPicker } from '../services/randomPicker';

const Winners: React.FC = () => {
  const { refreshTrigger } = useRaffleContext();
  const { raffles: completedRaffles, loading, error } = useWinners(refreshTrigger);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error || !Array.isArray(completedRaffles)) {
    return <NetworkErrors type={ErrorTypes.NOT_FOUND} />;
  }

  const handleViewWinner = async (raffleId: string) => {
    try {
      const response = await randomPicker.getWinner(raffleId);
      if (response.success) {
        window.open(`https://app.randompicker.com/protocol/${raffleId}`, '_blank');
      }
    } catch (error) {
      console.error('Error fetching winner:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <PageTitle>Winners Gallery</PageTitle>
      <p className="text-white/60 text-lg mb-8 text-center">
        Discover our latest raffle winners and their prizes
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {completedRaffles.map((raffle) => (
          <motion.div
            key={raffle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1a1a1a] rounded-xl overflow-hidden hover:shadow-lg 
                     transition-all duration-300 border border-gray-800"
          >
            <div className="relative aspect-square">
              <img 
                src={raffle.prize_image} 
                alt={raffle.project_name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full 
                               text-sm font-medium">#{raffle.nft_id}</span>
                <span className="bg-red-500/90 backdrop-blur-sm px-3 py-1 rounded-full 
                               text-sm font-medium">{moment(raffle.raffle_at).fromNow()}</span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                {raffle.project_name}
              </h3>
              
              <div className="text-sm text-gray-400">
                <div className="flex justify-between items-center mb-2">
                  <span>Total Entries</span>
                  <span className="font-medium text-white">
                    {raffle.entry_count.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span>Drawn</span>
                  <span className="font-medium text-white">
                    {moment(raffle.raffle_at).format('MMM D, YYYY')}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => handleViewWinner(raffle.id)}
                className="w-full mt-3 py-2 text-center bg-white/5 hover:bg-white/10 
                         rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                View Winner
              </button>
            </div>
          </motion.div>
        ))}

        {completedRaffles.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-12">
            No completed raffles yet
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Winners;