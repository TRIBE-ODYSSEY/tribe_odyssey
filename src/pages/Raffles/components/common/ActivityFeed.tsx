import { FC } from 'react';
import { Activity } from '../../types/Raffle.types';
import ParticipantCard from './ParticipantCard';

interface Props {
  activities: Activity[];
  selectedParticipant: string | null;
  onSelectParticipant: (address: string) => void;
}

const ActivityFeed: FC<Props> = ({ activities, selectedParticipant, onSelectParticipant }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-3">
        {activities?.map((activity) => (
          <ParticipantCard
            key={activity.id}
            participant={activity}
            isSelected={selectedParticipant === activity.address}
            onClick={() => onSelectParticipant(activity.address)}
          />
        ))}
        {(!activities || activities.length === 0) && (
          <div className="text-center text-gray-400 py-4">
            No recent activity
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed; 