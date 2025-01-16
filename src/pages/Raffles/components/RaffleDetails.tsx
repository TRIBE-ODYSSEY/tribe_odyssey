import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import moment from 'moment';
import useRaffle from '../hooks/useRaffle';
import { useRaffleContext } from '../context/RaffleContext';
import PageTitle from '@src/components/common/PageTitle';
import ErrorMessage from '@src/components/common/errors/network/NetworkErrors';
import { Spinner } from 'flowbite-react';
import RaffleConditionCard from './common/RaffleConditionCard';
import ParticipantList from './common/ParticipantList';
import ActivityFeed from './common/ActivityFeed';
import WinnerCard from './common/WinnerCard';
import { RaffleCondition } from '../types/Raffle.types';

const RaffleDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setCurrentRaffle } = useRaffleContext();
  const { raffle, participants, activities, winner, loading, error } = useRaffle(id!, 0);
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);

  // Set current raffle in context when loaded
  useEffect(() => {
    if (raffle) {
      setCurrentRaffle(raffle);
    }
    return () => setCurrentRaffle(null);
  }, [raffle, setCurrentRaffle]);

  if (loading) {
    return <Spinner />;
  }

  if (error || !raffle) {
    return <ErrorMessage message={error || 'Raffle not found'} />;
  }

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
              {raffle.project_description && (
                <DetailRow label="Description" value={raffle.project_description} />
              )}
            </div>

            {winner && <WinnerCard winner={winner} />}
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Entry Conditions</h2>
            <div className="space-y-2">
              {raffle.conditions.map((condition: RaffleCondition, index: number) => (
                <RaffleConditionCard key={index} condition={condition} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Participants & Activity */}
        <div className="space-y-6">
          <ActivityFeed 
            activities={activities} 
            selectedParticipant={selectedParticipant}
            onSelectParticipant={setSelectedParticipant}
          />

          <ParticipantList 
            participants={participants} 
            selectedParticipant={selectedParticipant}
            onSelectParticipant={setSelectedParticipant}
          />
        </div>
      </div>
    </motion.div>
  );
};

interface DetailRowProps {
  label: string;
  value: string | number;
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

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => (
  <div>
    <span className="text-gray-400">Status:</span>
    <span className={`ml-2 ${status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
      {status}
    </span>
  </div>
);

export default RaffleDetails;