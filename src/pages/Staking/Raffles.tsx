import React, { useState, useEffect } from 'react';
import PageTitle from '@src/components/common/PageTitle';
import PageLayout from '@src/components/common/layout/PageLayout';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Raffle } from '@src/lib/types/raffle';
import { randomPicker } from '@src/lib/services/randomPicker';
import { toast } from 'react-toastify';

const Raffles: React.FC = () => {
  const [activeRaffles, setActiveRaffles] = useState<Raffle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActiveRaffles();
  }, []);

  const fetchActiveRaffles = async () => {
    try {
      setIsLoading(true);
      const response = await randomPicker.getActiveRaffles();
      setActiveRaffles(response);
    } catch (error) {
      console.error('Failed to fetch active raffles:', error);
      toast.error('Failed to load raffles');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <PageTitle>Active Raffles</PageTitle>
            <Link 
              to="/winners"
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              View Past Winners
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeRaffles.map((raffle) => (
                <motion.div
                  key={raffle.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
                >
                  <img 
                    src={raffle.prizeImage} 
                    alt={raffle.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {raffle.title}
                    </h3>
                    <p className="text-white/60 mb-4">
                      {raffle.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Prize Value:</span>
                        <span className="text-white">{raffle.prizeValue}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Participants:</span>
                        <span className="text-white">{raffle.participantCount}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Ends in:</span>
                        <span className="text-white">
                          {new Date(raffle.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/raffles/${raffle.id}`}
                      className="mt-6 block w-full text-center bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors"
                    >
                      Enter Raffle
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Raffles;