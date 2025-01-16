import { FC } from 'react';
import { Participant } from '../../types/Raffle.types';
import ParticipantCard from './ParticipantCard';

interface Props {
  participants: Participant[];
  selectedParticipant: string | null;
  onSelectParticipant: (address: string) => void;
  userAddress?: string;
  maxDisplay?: number;
}

const ParticipantList: FC<Props> = ({ 
  participants, 
  selectedParticipant, 
  onSelectParticipant,
  userAddress,
  maxDisplay = 5
}) => {
  const sortedParticipants = [...participants].sort((a, b) => b.entry - a.entry);
  const displayParticipants = sortedParticipants.slice(0, maxDisplay);
  const userParticipant = userAddress && participants.find(p => p.address === userAddress);

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Top Participants</h2>
      <div className="space-y-3">
        {displayParticipants.map((participant) => (
          <ParticipantCard
            key={participant.id}
            participant={participant}
            isSelected={selectedParticipant === participant.address}
            onClick={() => onSelectParticipant(participant.address)}
          />
        ))}
        {userParticipant && !displayParticipants.find(p => p.address === userAddress) && (
          <>
            <div className="border-t border-gray-700 my-4" />
            <ParticipantCard
              participant={userParticipant}
              isSelected={selectedParticipant === userAddress}
              onClick={() => onSelectParticipant(userAddress)}
            />
          </>
        )}
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