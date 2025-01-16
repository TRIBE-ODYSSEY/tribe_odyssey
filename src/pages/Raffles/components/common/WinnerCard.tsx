import { FC } from 'react';
import { Winner } from '../../types/Raffle.types';
import AddressAvatar from '@src/components/common/AddressAvatar';
import { shortenAddress } from '@src/utils/address';
import moment from 'moment';

interface Props {
  winner: Winner;
  showTimestamp?: boolean;
  showProof?: boolean;
}

const WinnerCard: FC<Props> = ({ 
  winner,
  showTimestamp = false,
  showProof = false
}) => (
  <div className="mt-6 p-4 bg-gray-700 rounded-lg">
    <h3 className="text-lg font-semibold mb-3">Winner</h3>
    <div className="flex items-center gap-4">
      <AddressAvatar 
        address={winner.address} 
        size={48} 
        className="rounded-full" 
      />
      <div className="flex-1">
        <div className="font-medium">
          {winner.user?.name ?? shortenAddress(winner.address)}
        </div>
        <div className="text-sm text-gray-400">
          Won with entry #{winner.winning_entry} of {winner.entry} total entries
        </div>
        {showTimestamp && winner.won_at && (
          <div className="text-sm text-gray-400 mt-1">
            {moment(winner.won_at).format('MMM D, YYYY HH:mm')}
          </div>
        )}
      </div>
      {showProof && winner.transaction_hash && (
        <a
          href={`/verify/${winner.transaction_hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 text-sm"
        >
          Verify
        </a>
      )}
    </div>
  </div>
);

export default WinnerCard; 