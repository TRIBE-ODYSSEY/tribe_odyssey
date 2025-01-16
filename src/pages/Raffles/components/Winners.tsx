import React from 'react';
import { motion } from 'framer-motion';
import moment from 'moment';
import useWinners from '../hooks/useWinners';
import { useRaffleContext } from '../context/RaffleContext';
import PageTitle from '@src/components/common/PageTitle';
import { Spinner } from 'flowbite-react';
import NetworkErrors, { ErrorTypes } from '@src/components/common/errors/network/NetworkErrors';

const Winners: React.FC = () => {
  const { refreshTrigger } = useRaffleContext();
  const { raffles: completedRaffles, loading, error } = useWinners(refreshTrigger);

  if (loading) {
    return <Spinner />;
  }

  if (error || !Array.isArray(completedRaffles)) {
    return <NetworkErrors type={ErrorTypes.NOT_FOUND} />;
  }

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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedRaffles.map((raffle) => (
          <motion.div
            key={raffle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg 
                     transition-all duration-300 border border-gray-700"
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
                <span className="bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full 
                               text-sm font-medium">Completed</span>
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

              <a 
                href={`https://app.randompicker.com/protocol/${raffle.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg 
                         hover:bg-blue-700 transition-colors inline-block text-center"
              >
                View Winner
              </a>
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