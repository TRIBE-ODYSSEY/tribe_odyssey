import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '@src/components/common/PageTitle';
import PageLayout from '@src/components/common/layout/PageLayout';
import Button from '@src/components/common/Button';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import { RaffleDetails as IRaffleDetails } from '@src/lib/types/raffle';
import { randomPicker } from '@src/lib/services/randomPicker';
import moment from 'moment';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { ZeroAddress } from 'ethers';

const RaffleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { address } = useAccount();
  const [raffle, setRaffle] = useState<IRaffleDetails | null>(null);
  const [points, setPoints] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    if (id) {
      fetchRaffleDetails(id);
    }
  }, [id]);

  const fetchRaffleDetails = async (raffleId: string) => {
    try {
      setIsLoading(true);
      const response = await randomPicker.getRaffleDetails(raffleId);
      setRaffle(response);
    } catch (error) {
      console.error('Failed to fetch raffle details:', error);
      toast.error('Failed to load raffle details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnterRaffle = async () => {
    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!raffle) {
      toast.error('Raffle details not found');
      return;
    }

    setIsEntering(true);
    try {
      await randomPicker.enterRaffle(id!, {
        address,
        points,
        conditions: raffle.conditions
      });
      toast.success('Successfully entered raffle!');
      fetchRaffleDetails(id!);
    } catch (error: any) {
      toast.error(error.message || 'Failed to enter raffle');
      console.error(error);
    } finally {
      setIsEntering(false);
    }
  };

  const shortenAddress = (address: string) => {
    if (address.includes('...')) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const calculateTimeLeft = () => {
    if (!raffle) return '';
    const now = moment();
    const end = moment(raffle.endDate);
    const duration = moment.duration(end.diff(now));
    
    if (duration.asSeconds() <= 0) return 'Ended';
    
    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    
    return `${days}d ${hours}h ${minutes}m`;
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500" />
        </div>
      </PageLayout>
    );
  }

  if (!raffle) {
    return (
      <PageLayout>
        <div className="text-center py-12 text-gray-400">
          Raffle not found
        </div>
      </PageLayout>
    );
  }

  const userParticipation = raffle.participants.find(p => p.address.toLowerCase() === address?.toLowerCase());
  const isEnded = moment(raffle.endDate).isBefore(moment());
  const canEnter = !isEnded && !isEntering && address && (!raffle.only_allow_once || !userParticipation);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <PageTitle>{raffle.title}</PageTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Left Column - Image and Description */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                <img 
                  src={raffle.prizeImage} 
                  alt={raffle.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                <h3 className="text-lg font-medium text-white mb-4">Description</h3>
                <p className="text-white/60">{raffle.description}</p>
              </div>

              {raffle.conditions.length > 0 && (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Entry Conditions</h3>
                  <div className="space-y-2">
                    {raffle.conditions.map((condition, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-white/60">Entry {index + 1}:</span>
                        <span className="text-white">{condition.points} points</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Details and Entry */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-white/60">Prize Value:</span>
                    <span className="text-white">{raffle.prizeValue}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-white/60">Participants:</span>
                    <span className="text-white">{raffle.participantCount}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-white/60">Time Left:</span>
                    <span className="text-white">{calculateTimeLeft()}</span>
                  </div>

                  {userParticipation && (
                    <div className="flex justify-between">
                      <span className="text-white/60">Your Points:</span>
                      <span className="text-white">{userParticipation.points}</span>
                    </div>
                  )}
                </div>
              </div>

              {!isEnded && (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Enter Raffle</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setPoints(Math.max(1, points - 1))}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        disabled={!canEnter}
                      >
                        -
                      </button>
                      <span className="text-white text-xl font-medium">{points}</span>
                      <button
                        onClick={() => setPoints(points + 1)}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        disabled={!canEnter}
                      >
                        +
                      </button>
                    </div>

                    <Button
                      onClick={handleEnterRaffle}
                      disabled={!canEnter}
                      className="w-full"
                    >
                      {isEntering ? 'Processing...' : userParticipation ? 'Already Entered' : 'Enter Raffle'}
                    </Button>

                    {!address && (
                      <p className="text-sm text-red-400">Please connect your wallet to enter</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Participants Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              Participants ({raffle.participants.length})
            </h3>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                        Address
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                        Points
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {raffle.participants.map((participant) => (
                      <tr 
                        key={participant.address}
                        className={`hover:bg-white/5 transition-colors ${
                          participant.address.toLowerCase() === address?.toLowerCase() ? 'bg-white/5' : ''
                        }`}
                      >
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Jazzicon 
                              diameter={20} 
                              seed={jsNumberForAddress(participant.address || ZeroAddress)} 
                            />
                            <a
                              href={`https://etherscan.io/address/${participant.address}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-purple-400 hover:text-purple-300 transition-colors"
                            >
                              {shortenAddress(participant.address)}
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-white">
                          {participant.points}
                        </td>
                        <td className="px-6 py-4 text-sm text-white">
                          {moment(participant.joinedAt).fromNow()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {raffle.participants.length === 0 && (
                <div className="text-center py-8 text-white/60">
                  No participants yet. Be the first to join!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default RaffleDetails;