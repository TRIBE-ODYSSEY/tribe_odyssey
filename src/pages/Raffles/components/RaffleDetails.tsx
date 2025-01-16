import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import moment from 'moment';
import useRaffle from '../hooks/useRaffle';
import { useRaffleContext } from '../context/RaffleContext';
import PageTitle from '@src/components/common/PageTitle';
import NetworkErrors, { ErrorTypes } from '@src/components/common/errors/network/NetworkErrors';
import { Spinner } from 'flowbite-react';
import RaffleConditionCard from './common/RaffleConditionCard';
import ParticipantList from './common/ParticipantList';
import ActivityFeed from './common/ActivityFeed';
import WinnerCard from './common/WinnerCard';
import { RaffleCondition, Activity } from '../types/Raffle.types';
import { useAccount } from 'wagmi';
import { useRaffleActions } from '../hooks/useRaffleActions';
import { toast } from 'react-toastify';

const RaffleDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { address } = useAccount();
  const { setCurrentRaffle } = useRaffleContext();
  const { raffle, participants, activities, winner, loading, error } = useRaffle(id!, 0);
  const { enterRaffle } = useRaffleActions();
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);
  const [isEntering, setIsEntering] = useState(false);

  // Set current raffle in context when loaded
  useEffect(() => {
    if (raffle) {
      setCurrentRaffle(raffle);
    }
    return () => setCurrentRaffle(null);
  }, [raffle, setCurrentRaffle]);

  const handleEnterRaffle = async (points: number) => {
    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsEntering(true);
    try {
      const success = await enterRaffle(id!, points);
      if (success) {
        toast.success('Successfully entered raffle!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to enter raffle');
    } finally {
      setIsEntering(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error || !raffle) {
    return <NetworkErrors type={ErrorTypes.NOT_FOUND} />;
  }

  const isActive = raffle.project_status === 'active';
  const userParticipation = participants.find(p => p.address === address);
  const totalUserEntries = userParticipation ? userParticipation.entry : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <PageTitle>{raffle.project_name}</PageTitle>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {/* Left Column - Raffle Info */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Raffle Details</h2>
            <div className="space-y-3">
              <StatusBadge status={raffle.project_status} />
              <DetailRow label="Start Date" value={moment(raffle.raffle_at).format('MMM D, YYYY HH:mm')} />
              <DetailRow label="End Date" value={moment(raffle.endDate).format('MMM D, YYYY HH:mm')} />
              <DetailRow label="Total Entries" value={raffle.entry_count.toLocaleString()} />
              <DetailRow label="Total Points" value={raffle.total_points.toLocaleString()} />
              {raffle.project_description && (
                <DetailRow label="Description" value={raffle.project_description} />
              )}
              {raffle.website && (
                <DetailRow 
                  label="Website" 
                  value={
                    <a 
                      href={raffle.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      {raffle.website}
                    </a>
                  }
                />
              )}
            </div>

            {winner && <WinnerCard winner={winner} />}
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Entry Conditions</h2>
            <div className="space-y-2">
              {raffle.conditions.map((condition: RaffleCondition, index: number) => (
                <RaffleConditionCard 
                  key={index} 
                  condition={condition}
                  onEnter={isActive ? handleEnterRaffle : undefined}
                  disabled={isEntering}
                  userEntries={totalUserEntries}
                  maxEntriesPerUser={raffle.max_entries_per_user}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Participants & Activity */}
        <div className="space-y-6">
          <ActivityFeed 
            activities={activities as Activity[]} 
            selectedParticipant={selectedParticipant}
            onSelectParticipant={setSelectedParticipant}
          />

          <ParticipantList 
            participants={participants} 
            selectedParticipant={selectedParticipant}
            onSelectParticipant={setSelectedParticipant}
            userAddress={address}
          />
        </div>
      </div>
    </motion.div>
  );
};

interface DetailRowProps {
  label: string;
  value: string | number | React.ReactNode;
}

const DetailRow: FC<DetailRowProps> = ({ label, value }) => (
  <div>
    <span className="text-gray-400">{label}:</span>
    <span className="ml-2">{value}</span>
  </div>
);

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'text-green-500';
      case 'completed':
        return 'text-blue-500';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div>
      <span className="text-gray-400">Status:</span>
      <span className={`ml-2 ${getStatusColor()}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
  );
};

export default RaffleDetails;