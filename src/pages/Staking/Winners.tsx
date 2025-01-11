import React, { useState, useEffect } from 'react';
import PageTitle from '@src/components/common/PageTitle';
import PageLayout from '@src/components/common/layout/PageLayout';
import { Link } from 'react-router-dom';
import moment from 'moment';
import AddressAvatar from '@src/components/common/AddressAvatar';
import { randomPicker } from '@src/lib/services/randomPicker';
import { toast } from 'react-toastify';

interface Winner {
  address: string;
  raffleId: string;
  raffleTitle: string;
  prizeValue: string;
  prizeImage: string;
  wonAt: Date;
  project_key: string;
  transactionHash?: string;
}

const Winners: React.FC = () => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWinners();
  }, []);

  const fetchWinners = async () => {
    setIsLoading(true);
    try {
      const completedProjects = await randomPicker.getWinnersWithRetry();
      
      const formattedWinners: Winner[] = await Promise.all(
        completedProjects.map(async (project: any) => {
          try {
            // Additional error handling for each winner
            return {
              address: project.Winner.PublicInfo,
              raffleId: project.ID,
              raffleTitle: project.DisplayName,
              prizeValue: project.Prizes[0]?.PrizeName || 'N/A',
              prizeImage: project.ImageURL || '/images/placeholder.png',
              wonAt: new Date(project.DrawDate),
              project_key: project.ID_Method,
              transactionHash: project.Winner.PrivateInfo
            };
          } catch (error) {
            console.error(`Failed to process winner for project ${project.ID}:`, error);
            return null;
          }
        })
      );

      // Filter out any null values from failed processing
      setWinners(formattedWinners.filter((winner): winner is Winner => winner !== null));
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
            <PageTitle>Past Winners</PageTitle>
            <Link 
              to="/raffles"
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              View Active Raffles
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {winners.map((winner, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <img 
                      src={winner.prizeImage} 
                      alt={winner.raffleTitle}
                      className="w-full h-48 md:h-full object-cover"
                    />
                    <div className="p-6 md:col-span-2">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {winner.raffleTitle}
                      </h3>

                      <div className="bg-[#1b1921] rounded-md p-4 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-[16px]">Winner Selected</span>
                          <div className="flex items-center gap-2 text-purple-400">
                            {moment(winner.wonAt).fromNow()}
                            <a
                              href={`https://app.randompicker.com/protocol/${winner.project_key}`}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:opacity-80 transition-opacity"
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.66667 2V3.33333H3.33333V12.6667H12.6667V9.33333H14V13.3333C14 13.5101 13.9298 13.6797 13.8047 13.8047C13.6797 13.9298 13.5101 14 13.3333 14H2.66667C2.48986 14 2.32029 13.9298 2.19526 13.8047C2.07024 13.6797 2 13.5101 2 13.3333V2.66667C2 2.48986 2.07024 2.32029 2.19526 2.19526C2.32029 2.07024 2.48986 2 2.66667 2H6.66667Z" fill="url(#paint0_linear_1442_1430)"/>
                                <defs>
                                  <linearGradient id="paint0_linear_1442_1430" x1="14" y1="7.88679" x2="1.76923" y2="7.88679" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#9A34EF"/>
                                    <stop offset="1" stopColor="#D826FF"/>
                                  </linearGradient>
                                </defs>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-2">
                          <AddressAvatar 
                            address={winner.address} 
                            size={50}
                            className="flex-shrink-0"
                          />
                          <div className="flex flex-col">
                            <span className="text-white/60">Winner</span>
                            <span className="text-white">{shortenAddress(winner.address)}</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-white/60">ETH:</span>
                            <a
                              href={`https://etherscan.io/address/${winner.address}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                            >
                              {shortenAddress(winner.address)}
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-white/60 block">Prize Value:</span>
                          <span className="text-white">{winner.prizeValue}</span>
                        </div>
                        {winner.transactionHash && (
                          <div>
                            <span className="text-white/60 block">Transaction:</span>
                            <a
                              href={`https://etherscan.io/tx/${winner.transactionHash}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-purple-400 hover:text-purple-300 transition-colors"
                            >
                              View on Etherscan
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {winners.length === 0 && (
                <div className="text-center py-12 text-white/60">
                  No winners yet. Check back soon!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Winners;