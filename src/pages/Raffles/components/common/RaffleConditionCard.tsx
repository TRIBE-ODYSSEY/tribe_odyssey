import { FC } from 'react';
import { RaffleCondition } from '../../types/Raffle.types';

interface Props {
  condition: RaffleCondition;
}

const RaffleConditionCard: FC<Props> = ({ condition }) => (
  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
    <span>{condition.points} Points</span>
    <span>{condition.entry} Entries</span>
  </div>
);

export default RaffleConditionCard; 