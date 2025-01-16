import { FC } from 'react';
import moment from 'moment';
import { Participant } from '../../types/Raffle.types';
import AddressAvatar from '@src/components/common/AddressAvatar';
import { shortenAddress } from '@src/utils/address';

interface Props {
  participant: Participant;
  isSelected: boolean;
  onClick: () => void;
}

const ParticipantCard: FC<Props> = ({ participant, isSelected, onClick }) => (
  <div 
    className={`flex justify-between items-center p-3 bg-gray-700 rounded-lg cursor-pointer 
              hover:bg-gray-600 transition-colors ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <AddressAvatar address={participant.address} size={32} className="rounded-full" />
      <div>
        <div className="font-medium">
          {participant.user?.name ?? shortenAddress(participant.address)}
        </div>
        <div className="text-sm text-gray-400">{participant.entry} Entries</div>
      </div>
    </div>
    <div className="text-sm text-gray-400">
      {moment(participant.entered_at).fromNow()}
    </div>
  </div>
);

export default ParticipantCard; 