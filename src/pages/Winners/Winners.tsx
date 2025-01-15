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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedRaffles.map((raffle) => (
            <motion.div
              key={raffle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden 
                       hover:border-white/20 transition-all duration-300"
            >
              <div className="relative">
                <img 
                  src={raffle.prize_image} 
                  alt={raffle.project_name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {raffle.project_name}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-white/80">
                    <span className="font-medium">Winner</span>
                    <span className="font-mono">
                      {raffle.winner?.address.slice(0, 6)}...{raffle.winner?.address.slice(-4)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-white/80">
                    <span className="font-medium">Prize</span>
                    <span>#{raffle.nft_id}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-white/80">
                    <span className="font-medium">Drawn</span>
                    <span>{moment(raffle.raffle_at).fromNow()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-white/80">
                    <span className="font-medium">Total Entries</span>
                    <span>{raffle.entry_count.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <a
                    href={`https://app.randompicker.com/protocol/${raffle.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 
                             transition-colors duration-200"
                  >
                    <span>Verify on RandomPicker</span>
                    <svg 
                      className="w-4 h-4" 
                      viewBox="0 0 24 24" 
                      fill="none"
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Winners;