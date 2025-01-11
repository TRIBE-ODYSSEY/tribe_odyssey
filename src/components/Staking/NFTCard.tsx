import React from 'react';
import { motion } from 'framer-motion';

interface NFTCardProps {
  tokenId: string;
  contract: string;
  isStaked: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const NFTCard: React.FC<NFTCardProps> = ({
  tokenId,
  contract,
  isStaked,
  isSelected,
  onClick,
}) => {
  const imageUrl = contract === "0x77f649385ca963859693c3d3299d36dfc7324eb9"
    ? `https://cdn.0xworld.io/tribe-images/${tokenId || 0}.png`
    : `https://cdn.0xworld.io/0xworld-ape-images/${tokenId || 0}.png`;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative rounded-xl overflow-hidden cursor-pointer
        ${isSelected ? 'ring-2 ring-red-500' : 'ring-1 ring-white/10'}
        transition-all duration-200
      `}
    >
      <img
        src={imageUrl}
        alt={`NFT #${tokenId}`}
        className="w-full h-full object-cover aspect-square"
        loading="lazy"
      />
      
      {isStaked && (
        <div className="absolute top-2 right-2 bg-red-500/90 text-white text-xs px-2 py-1 rounded-full">
          Staked
        </div>
      )}
      
      {isSelected && (
        <div className="absolute inset-0 bg-red-500/20 backdrop-blur-sm">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default NFTCard;