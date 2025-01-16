import { FC } from 'react';
import { Winner } from '../../types/Raffle.types';
import AddressAvatar from '@src/components/common/AddressAvatar';
import { shortenAddress } from '@src/utils/address';

interface Props {
  winner: Winner;
}

const WinnerCard: FC<Props> = ({ winner }) => (
  <div className="mt-6 p-4 bg-gray-700 rounded-lg">
    <h3 className="text-lg font-semibold mb-3">Winner</h3>
    <div className="flex items-center gap-4">
      <AddressAvatar address={winner.address} size={48} className="rounded-full" />
      <div>
        <div className="font-medium">
          {winner.user?.name ?? shortenAddress(winner.address)}
        </div>
        <div className="text-sm text-gray-400">
          Won with entry #{winner.winning_entry} of {winner.entry} total entries
        </div>
      </div>
    </div>
  </div>
);

export default WinnerCard; 