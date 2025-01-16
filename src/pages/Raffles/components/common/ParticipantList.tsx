import { FC } from 'react';
import { Participant } from '../../types/Raffle.types';
import ParticipantCard from './ParticipantCard';

interface Props {
  participants: Participant[];
  selectedParticipant: string | null;
  onSelectParticipant: (address: string) => void;
}

const ParticipantList: FC<Props> = ({ 
  participants, 
  selectedParticipant, 
  onSelectParticipant 
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Top Participants</h2>
      <div className="space-y-3">
        {participants?.slice(0, 5).map((participant) => (
          <ParticipantCard
            key={participant.id}
            participant={participant}
            isSelected={selectedParticipant === participant.address}
            onClick={() => onSelectParticipant(participant.address)}
          />
        ))}
        {(!participants || participants.length === 0) && (
          <div className="text-center text-gray-400 py-4">
            No participants yet
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipantList; 