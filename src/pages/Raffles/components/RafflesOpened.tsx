import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAccount, useSignMessage } from 'wagmi';
import { motion } from 'framer-motion';
import moment from 'moment';
import { toast } from 'react-toastify';
import { randomPicker } from '../services/randomPicker';
import { useRaffle } from '../hooks/useRaffle';
import PageTitle from '@src/components/common/PageTitle';
import Button from '@src/components/common/Button';
import AddressAvatar from '@src/components/common/AddressAvatar';
import { shortenAddress } from '@src/utils/address';

const RafflesOpened: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [trigger, setTrigger] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(-1);
  const [custom, setCustom] = useState<number>();
  const [countDown, setCountDown] = useState<string>("");
  
  const timerRef = useRef<NodeJS.Timeout>();
  const intervalRef = useRef<NodeJS.Timeout>();

  const { raffle, participants, activities, winner, loading, error } = useRaffle(id, trigger);

  useEffect(() => {
    if (raffle?.endDate) {
      const updateCountdown = () => {
        const now = moment();
        const end = moment(raffle.endDate);
        const duration = moment.duration(end.diff(now));
        
        if (duration.asSeconds() <= 0) {
          setCountDown('Ended');
          clearInterval(intervalRef.current);
        } else {
          setCountDown(`${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`);
        }
      };

      updateCountdown();
      intervalRef.current = setInterval(updateCountdown, 1000);

      return () => clearInterval(intervalRef.current);
    }
  }, [raffle?.endDate]);

  const onEnterRaffle = async (points: number) => {
    if (!raffle) {
      toast.error("Raffle not found!");
      return;
    }

    if (points <= 0) {
      toast.error("Please input valid points!");
      return;
    }

    if (!isConnected || !address) {
      toast.error("Please connect wallet!");
      return;
    }

    try {
      setLoadingIndex(points);
      const nonce = await randomPicker.getNonce(address);
      const signature = await signMessageAsync({
        message: `I am signing my one-time nonce: ${nonce}`,
      });

      await randomPicker.enterRaffleProject(raffle.id, {
        address,
        points,
        signature
      });

      setShowFireworks(true);
      toast.success("Successfully entered!");
      setTrigger(prev => prev + 1);
      
      timerRef.current = setTimeout(() => setShowFireworks(false), 10000);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.error === "this raffle allow only once" 
        ? "Failed to enter! This raffle allows only once!"
        : "Failed to enter!");
    } finally {
      setLoadingIndex(-1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <PageTitle>Open Raffles</PageTitle>

      {showFireworks && (
        <div className="fixed inset-0 pointer-events-none">
          {/* Fireworks animation component would go here */}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {/* Left Column - Raffle Info */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Current Raffle</h2>
            {raffle && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">{raffle.project_name}</h3>
                  <p className="text-gray-400">{raffle.project_description}</p>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                  <div className="text-gray-300">Time Remaining:</div>
                  <div className="font-medium">{countDown}</div>
                </div>

                {isConnected && !winner && (
                  <div className="space-y-4 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      {raffle.conditions.map((condition, index) => (
                        <Button
                          key={index}
                          onClick={() => onEnterRaffle(condition.points)}
                          disabled={loadingIndex >= 0}
                          className="w-full p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          <div className="text-sm font-medium">{condition.points} Points</div>
                          <div className="text-xs text-gray-400">{condition.entry} Entries</div>
                        </Button>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <input
                        type="number"
                        value={custom ?? ''}
                        onChange={(e) => setCustom(parseInt(e.target.value))}
                        placeholder="Custom points"
                        className="flex-1 bg-gray-700 rounded-lg p-3"
                        min="1"
                      />
                      <Button
                        onClick={() => custom && onEnterRaffle(custom)}
                        disabled={loadingIndex >= 0}
                        className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-800"
                      >
                        {loadingIndex >= 0 ? 'Entering...' : 'Enter'}
                      </Button>
                    </div>
                  </div>
                )}

                {!isConnected && (
                  <div className="text-center text-gray-400 py-4">
                    Please connect your wallet to enter
                  </div>
                )}

                {winner && (
                  <div className="text-center text-red-500 font-medium py-4">
                    Raffle has ended
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Activity */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {activities?.map((activity) => (
                <div key={activity.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AddressAvatar address={activity.address} size={32} className="rounded-full" />
                    <div>
                      <div className="font-medium">{activity.user?.name ?? shortenAddress(activity.address)}</div>
                      <div className="text-sm text-gray-400">{activity.entry} Entries</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {moment(activity.entered_at).fromNow()}
                  </div>
                </div>
              ))}
              {(!activities || activities.length === 0) && (
                <div className="text-center text-gray-400 py-4">
                  No recent activity
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Top Participants</h2>
            <div className="space-y-3">
              {participants?.slice(0, 5).map((participant) => (
                <div key={participant.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AddressAvatar address={participant.address} size={32} className="rounded-full" />
                    <div>
                      <div className="font-medium">{participant.user?.name ?? shortenAddress(participant.address)}</div>
                      <div className="text-sm text-gray-400">{participant.entry} Entries</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {moment(participant.entered_at).fromNow()}
                  </div>
                </div>
              ))}
              {(!participants || participants.length === 0) && (
                <div className="text-center text-gray-400 py-4">
                  No participants yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RafflesOpened;