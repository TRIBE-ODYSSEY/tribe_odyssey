import { FC } from 'react';
import moment from 'moment';
import { RaffleDetails } from '../../types/Raffle.types';
import Button from '@src/components/common/Button';
import { motion } from 'framer-motion';

interface Props {
  raffle: RaffleDetails;
  isLoading: boolean;
  onEnter: (points: number) => void;
  onClick: () => void;
}

const RaffleCard: FC<Props> = ({ raffle, isLoading, onEnter, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
  >
    <div 
      className="relative aspect-square cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={raffle.prize_image} 
        alt={raffle.project_name}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-3 left-3 flex gap-2">
        <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
          #{raffle.nft_id}
        </span>
      </div>
    </div>
    
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">
        {raffle.project_name}
      </h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Entries</span>
          <span>{raffle.entry_count.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Ends</span>
          <span>{moment(raffle.endDate).fromNow()}</span>
        </div>
      </div>

      <div className="space-y-2">
        {raffle.conditions.map((condition, index) => (
          <Button
            key={index}
            onClick={() => onEnter(condition.points)}
            disabled={isLoading}
            className="w-full"
          >
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium">{condition.points} Points</span>
              <span className="text-xs text-gray-400">{condition.entry} Entries</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  </motion.div>
);

export default RaffleCard; 