import React, { useState, useEffect } from 'react';
import PageTitle from '@src/components/common/PageTitle';
import PageLayout from '@src/components/common/layout/PageLayout';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { motion } from 'framer-motion';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { ZeroAddress } from 'ethers';
import { randomPicker } from '@src/lib/services/randomPicker';
import { CompletedRaffle } from '@src/lib/types/raffle';
import { toast } from 'react-toastify';

const Winners: React.FC = () => {
  const [winners, setWinners] = useState<CompletedRaffle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWinners();
  }, []);

  const fetchWinners = async () => {
    try {
      setIsLoading(true);
      const response = await randomPicker.getCompletedRaffles();
      setWinners(response);
    } catch (error) {
      console.error('Failed to fetch winners:', error);
      toast.error('Failed to load winners');
    } finally {
      setIsLoading(false);
    }
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <PageTitle>Winners Gallery</PageTitle>
            <Link 
              to="/raffles"
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              View Active Raffles
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {winners.map((winner) => (
                <motion.div
                  key={winner.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
                >
                  <div className="relative">
                    <img 
                      src={winner.prizeImage} 
                      alt={winner.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-yellow-400 text-black font-semibold px-3 py-1 rounded-full text-sm">
                        Winner Announced!
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {winner.title}
                    </h3>
                    
                    <div className="bg-[#1b1921] rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-white/60">Ended</span>
                        <span className="text-sm text-purple-400">
                          {moment.utc(winner.ended_at).fromNow()}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Jazzicon 
                          diameter={32} 
                          seed={jsNumberForAddress(winner.winner || ZeroAddress)} 
                        />
                        <div>
                          <div className="text-sm text-white/60">Winner</div>
                          <a 
                            href={`https://etherscan.io/address/${winner.winner}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                          >
                            {shortenAddress(winner.winner)}
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-white/60 block text-sm">Prize Value:</span>
                        <span className="text-white">{winner.prizeValue}</span>
                      </div>
                      <div>
                        <span className="text-white/60 block text-sm">Participants:</span>
                        <span className="text-white">{winner.participantCount}</span>
                      </div>
                    </div>

                    <a
                      href={`https://app.randompicker.com/protocol/${winner.project_key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors"
                    >
                      Verify on RandomPicker
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!isLoading && winners.length === 0 && (
            <div className="text-center py-12">
              <div className="text-white/60">No winners announced yet.</div>
              <Link 
                to="/raffles" 
                className="text-red-400 hover:text-red-300 transition-colors mt-2 inline-block"
              >
                View Active Raffles
              </Link>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Winners;
