import React from 'react';
import { motion } from 'framer-motion';
import TRIBE_CONTRACT_ADDRESS from '@src/lib/viem/contracts';
import type { Address } from 'viem';

interface NFTCardProps {
  tokenId: string;
  contract: Address;
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
  // Determine image URL based on contract address
  const imageUrl = contract.toLowerCase() === TRIBE_CONTRACT_ADDRESS[1]
    ? `https://cdn.0xworld.io/tribe-images/${tokenId}.png`
    : `https://cdn.0xworld.io/0xworld-ape-images/${tokenId}.png`;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative rounded-xl overflow-hidden cursor-pointer
        ${isSelected 
          ? 'ring-2 ring-[var(--color-button-primary)]' 
          : 'ring-1 ring-[var(--color-text-primary)]/10'
        }
        transition-all duration-200 hover:ring-[var(--color-text-primary)]/20
      `}
    >
      <div className="aspect-square relative">
        <img
          src={imageUrl}
          alt={`NFT #${tokenId}`}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = '/images/placeholder-nft.png';
          }}
        />
        
        {isStaked && (
          <div className="absolute top-2 right-2 bg-[var(--color-button-primary)]/90 
                         text-[var(--color-text-on-primary)] text-xs px-2 py-1 rounded-full">
            Staked
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-[var(--color-overlay-dark)] 
                       backdrop-blur-sm px-2 py-1">
          <p className="text-[var(--color-text-on-dark)] text-sm text-center font-medium">
            #{tokenId}
          </p>
        </div>
        
        {isSelected && (
          <div className="absolute inset-0 bg-[var(--color-button-primary)]/20 
                         backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[var(--color-text-on-primary)]"
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
        )}
      </div>
    </motion.div>
  );
};

export default NFTCard;