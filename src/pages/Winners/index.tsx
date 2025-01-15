import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { randomPicker } from '../Raffles/services/randomPicker';
import { IRaffleDetails, ApiResponse } from '../Raffles/types';
import moment from 'moment';
import { toast } from 'react-toastify';
import PageTitle from '@src/components/common/PageTitle';

const Winners: React.FC = () => {
  const [completedRaffles, setCompletedRaffles] = useState<IRaffleDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCompletedRaffles();
  }, []);

  const fetchCompletedRaffles = async () => {
    try {
      setIsLoading(true);
      const response: ApiResponse<IRaffleDetails[]> = await randomPicker.getProjectDetails('completed');
      
      if (response.success) {
        setCompletedRaffles(response.data);
      } else {
        toast.error(response.error || 'Failed to load winners');
      }
    } catch (error) {
      console.error('Failed to fetch completed raffles:', error);
      toast.error('Failed to load winners');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
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
                    <span>Entries</span>
                    <span className="font-medium text-white">
                      {raffle.entry_count.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => window.open(`https://app.randompicker.com/protocol/${raffle.id}`, '_blank')}
                  className="w-full mt-3 py-2 text-center bg-white/5 hover:bg-white/10 
                           rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  View Winner
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Winners;