import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAccount, useSignMessage } from 'wagmi';
import { toast } from 'react-toastify';
import moment from 'moment';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import PageTitle from '@src/components/common/PageTitle';
import PageLayout from '@src/components/common/layout/PageLayout';
import Button from '@src/components/common/Button';
import { IRaffleDetails, RaffleResponse } from '../types';
import { randomPicker } from '../services/randomPicker';

const RaffleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  
  const [raffle, setRaffle] = useState<IRaffleDetails | null>(null);
  const [points, setPoints] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    if (id) {
      fetchRaffleDetails(id);
    }
  }, [id]);

  const fetchRaffleDetails = async (projectId: string) => {
    try {
      setIsLoading(true);
      const response = await randomPicker.getProjectDetails(projectId);
      
      // Transform response to match RaffleResponse type
      const raffle: IRaffleDetails = {
        id: response.id,
        title: response.name,
        description: '',
        prizeValue: response.prizes,
        endDate: new Date().toISOString(),
        participantCount: 0,
        imageUrl: '',
        conditions: [],
        onlyAllowOnce: true,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        projectId: response.id,
        projectKey: '',
        projectName: response.name,
        projectStatus: response.status,
        projectType: response.type,
        projectDrawType: response.drawType,
        projectPrizes: response.prizes,
        projectConditions: response.conditions,
        projectPublicResults: response.publicResults,
        projectWebsite: response.website,
        participants: [],
        totalEntries: 0
      };

      const raffleResponse: RaffleResponse = {
        success: true,
        message: 'Raffle details fetched successfully',
        data: [raffle]
      };

      if (!raffleResponse.success || !raffleResponse.data) {
        throw new Error(raffleResponse.error || 'Failed to fetch raffle details');
      }

      setRaffle(raffleResponse.data as unknown as IRaffleDetails);
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

    if (raffle.status !== 'active') {
      toast.error('This raffle is not active');
      return;
    }

    if (moment(raffle.endDate).isBefore(moment())) {
      toast.error('This raffle has ended');
      return;
    }

    if (raffle.onlyAllowOnce && raffle.isParticipating) {
      toast.error('You have already entered this raffle');
      return;
    }

    setIsEntering(true);
    try {
      // Get nonce for signature
      const { data: { nonce } } = await randomPicker.getNonce(address);
      
      // Sign message with nonce
      const signature = await signMessageAsync({
        message: `I am signing to enter raffle ${id} with ${points} points. Nonce: ${nonce}`
      });

      // Enter raffle with signature
      const response = await randomPicker.enterRaffleProject(id!, {
        address,
        points,
        signature
      });

      if (response.success) {
        toast.success('Successfully entered raffle!');
        fetchRaffleDetails(id!);
      } else {
        throw new Error(response.error || 'Failed to enter raffle');
      }
    } catch (error: unknown) {
      console.error('Failed to enter raffle:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to enter raffle');
    } finally {
      setIsEntering(false);
    }
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500" />
        </div>
      </PageLayout>
    );
  }

  if (!raffle) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-white mb-4">Raffle Not Found</h2>
          <p className="text-white/60">The raffle you're looking for doesn't exist or has been removed.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <PageTitle>{raffle.title}</PageTitle>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Image and Details */}
            <div>
              <img 
                src={raffle.imageUrl} 
                alt={raffle.title}
                className="w-full rounded-xl mb-6"
              />
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-white/60">Prize Value:</span>
                    <span className="text-white">{raffle.prizeValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Total Entries:</span>
                    <span className="text-white">{raffle.totalEntries}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Participants:</span>
                    <span className="text-white">{raffle.participantCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Status:</span>
                    <span className="text-white capitalize">{raffle.status}</span>
                  </div>
                  {raffle.myEntries && (
                    <div className="flex justify-between">
                      <span className="text-white/60">Your Entries:</span>
                      <span className="text-white">{raffle.myEntries}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Entry Form */}
            <div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Enter Raffle</h3>
                <p className="text-white/60 mb-6">{raffle.description}</p>

                <div className="space-y-6">
                  {/* Points Selection */}
                  <div>
                    <label className="block text-white/60 mb-2">Entry Points</label>
                    <select
                      value={points}
                      onChange={(e) => setPoints(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                      disabled={raffle.status !== 'active'}
                    >
                      {raffle.conditions.map((condition) => (
                        <option key={condition.points} value={condition.points}>
                          {condition.points} points - {condition.entry} entries
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Entry Button */}
                  <Button
                    onClick={handleEnterRaffle}
                    disabled={
                      isEntering || 
                      raffle.status !== 'active' || 
                      moment(raffle.endDate).isBefore(moment()) ||
                      (raffle.onlyAllowOnce && raffle.isParticipating)
                    }
                    className="w-full"
                  >
                    {isEntering ? 'Entering...' : 'Enter Raffle'}
                  </Button>

                  {/* Recent Participants */}
                  {raffle.participants.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-lg font-semibold text-white mb-4">Recent Participants</h4>
                      <div className="space-y-4">
                        {raffle.participants.slice(0, 5).map((participant) => (
                          <div key={participant.address} className="flex items-center gap-4">
                            <Jazzicon diameter={40} seed={jsNumberForAddress(participant.address)} />
                            <div>
                              <a
                                href={`https://etherscan.io/address/${participant.address}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-purple-400 hover:text-purple-300 transition-colors"
                              >
                                {`${participant.address.slice(0, 6)}...${participant.address.slice(-4)}`}
                              </a>
                              <p className="text-white/60 text-sm">
                                {participant.entries} entries • {moment(participant.joinedAt).fromNow()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default RaffleDetails;