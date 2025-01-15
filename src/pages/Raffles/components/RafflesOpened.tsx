import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAccount, useSignMessage } from 'wagmi';
import { motion } from 'framer-motion';
import moment from 'moment';
import { toast } from 'react-toastify';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { ZeroAddress } from 'ethers';
import { randomPicker } from '../services/randomPicker';
import { useRaffle } from '../hooks/useRaffle';
import { shortenAddress } from '@src/utils/address';
import AddressAvatar from '@src/components/common/AddressAvatar';

interface ParticipantsProps {
  raffle: any;
  participants: any[];
  activities: any[];
}

const Participants: React.FC<ParticipantsProps> = ({ raffle, participants, activities }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        {activities.length === 0 ? (
          <div className="text-center text-gray-400 py-4">
            No recent activity
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-4">
                  <AddressAvatar
                    address={activity.address}
                    size={48}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-white">
                      {activity?.user?.name ?? shortenAddress(activity.address || ZeroAddress)}
                    </h3>
                    <div className="text-blue-400">{activity.points} Points Used</div>
                  </div>
                </div>
                <div className="text-gray-400">
                  {moment.utc(activity.created_at).fromNow()}
                </div>
              </div>
            ))}
          </div>
        )}

        <h2 className="text-xl font-semibold pt-6">Participants</h2>
        {participants.length === 0 ? (
          <div className="text-center text-gray-400 py-4">
            No participants yet
          </div>
        ) : (
          <div className="space-y-4">
            {participants.map((participant) => (
              <div key={participant.id} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <div className="flex items-center gap-4">
                  <AddressAvatar
                    address={participant.address}
                    size={48}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-white">
                      {participant?.user?.name ?? shortenAddress(participant.address || ZeroAddress)}
                    </h3>
                    <div className="text-blue-400">{participant.entry} Entries</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  {moment.utc(participant.entered_at).fromNow()}
                  <FaExternalLinkAlt className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

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
      {showFireworks && (
        <div className="fixed inset-0 pointer-events-none">
          {/* Fireworks component */}
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Open Raffles</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-300">Time Remaining: {countDown}</div>
            {winner && (
              <div className="text-red-500 font-medium">Raffle Ended</div>
            )}
          </div>

          {isConnected && !winner && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={custom ?? ''}
                  onChange={(e) => setCustom(parseInt(e.target.value))}
                  placeholder="Enter points"
                  className="flex-1 bg-gray-700 rounded-lg p-3"
                  min="1"
                />
                <button
                  onClick={() => custom && onEnterRaffle(custom)}
                  disabled={loadingIndex >= 0}
                  className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-800"
                >
                  {loadingIndex >= 0 ? 'Entering...' : 'Enter Raffle'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {raffle && (
        <Participants 
          raffle={raffle}
          participants={participants ?? []}
          activities={activities ?? []}
        />
      )}
    </motion.div>
  );
};

export default RafflesOpened;