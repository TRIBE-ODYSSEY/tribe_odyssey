import React, { useState, useEffect } from 'react';
import PageTitle from '@src/components/common/PageTitle';
import PageLayout from '@src/components/common/layout/PageLayout';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { ZeroAddress } from 'ethers';
import { randomPicker } from '@src/lib/services/randomPicker';
import { toast } from 'react-toastify';

interface CompletedRaffle {
  id: string;
  title: string;
  description: string;
  endDate: Date;
  ended_at: string;
  prizeImage: string;
  winner: string;
  prizeValue: string;
  totalParticipants: number;
  project_key: string;
}

const RafflesOpened: React.FC = () => {
  const [completedRaffles, setCompletedRaffles] = useState<CompletedRaffle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCompletedRaffles();
  }, []);

  const fetchCompletedRaffles = async () => {
    setIsLoading(true);
    try {
      const completedProjects = await randomPicker.getWinnersWithRetry();
      
      const formattedRaffles: CompletedRaffle[] = await Promise.all(
        completedProjects.map(async (project: any) => ({
          id: project.ID,
          title: project.DisplayName,
          description: project.Conditions || 'No description available',
          endDate: new Date(project.DrawDate),
          ended_at: project.DrawDate,
          prizeImage: project.ImageURL || '/images/placeholder.png',
          winner: project.Winner.PublicInfo,
          prizeValue: project.Prizes[0]?.PrizeName || 'N/A',
          totalParticipants: project.ParticipantCount || 0,
          project_key: project.ID_Method
        }))
      );

      setCompletedRaffles(formattedRaffles);
    } catch (error) {
      console.error('Failed to fetch completed raffles:', error);
      toast.error('Failed to load completed raffles');
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
            <PageTitle>Past Raffles</PageTitle>
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
              {completedRaffles.map((raffle) => (
                <div
                  key={raffle.id}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <img 
                      src={raffle.prizeImage} 
                      alt={raffle.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                    <div className="p-6 md:col-span-2">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {raffle.title}
                      </h3>
                      <p className="text-white/60 mb-4">
                        {raffle.description}
                      </p>

                      <div className="bg-[#1b1921] rounded-t-md p-4 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-[16px]">Competition Ended</span>
                          <div className="flex items-center gap-2 text-purple-400">
                            {moment.utc(raffle.ended_at).fromNow()}
                            <a
                              href={`https://app.randompicker.com/protocol/${raffle.project_key}`}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:opacity-80 transition-opacity"
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-[50px] h-[50px]">
                            <Jazzicon 
                              diameter={50} 
                              seed={jsNumberForAddress(raffle.winner || ZeroAddress)} 
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-white/60">Winner</span>
                            <span className="text-white">{shortenAddress(raffle.winner)}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-white/60">ETH:</span>
                            <a
                              href={`https://etherscan.io/address/${raffle.winner}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                            >
                              {shortenAddress(raffle.winner)}
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
                          <span className="text-white">{raffle.prizeValue}</span>
                        </div>
                        <div>
                          <span className="text-white/60 block">Participants:</span>
                          <span className="text-white">{raffle.totalParticipants}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default RafflesOpened;