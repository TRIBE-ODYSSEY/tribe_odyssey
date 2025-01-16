import { FC } from 'react';
import { RaffleCondition } from '../../types/Raffle.types';
import Button from '@src/components/common/Button';

interface Props {
  condition: RaffleCondition;
  onEnter?: (points: number) => Promise<void>;
  disabled?: boolean;
  userEntries?: number;
  maxEntriesPerUser?: number;
}

const RaffleConditionCard: FC<Props> = ({ 
  condition, 
  onEnter, 
  disabled,
  userEntries = 0,
  maxEntriesPerUser = 0
}) => {
  const isMaxedOut = maxEntriesPerUser > 0 && userEntries >= maxEntriesPerUser;

  return (
    <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
      <div className="flex flex-col">
        <span className="text-lg font-medium">{condition.points} Points</span>
        <span className="text-sm text-gray-400">for {condition.entry} {condition.entry === 1 ? 'Entry' : 'Entries'}</span>
      </div>
      {onEnter && (
        <Button
          onClick={() => onEnter(condition.points)}
          disabled={disabled || isMaxedOut}
          className="px-4 py-2"
        >
          {isMaxedOut ? 'Max Entries' : disabled ? 'Entering...' : 'Enter'}
        </Button>
      )}
    </div>
  );
};

export default RaffleConditionCard; 