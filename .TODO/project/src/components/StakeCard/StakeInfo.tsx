import React from 'react';
import { useBalance } from 'wagmi';
import { formatEther } from 'viem';
import { NFTStakingState } from '../../hooks/useNFTStaking';

interface StakeInfoProps {
  address?: string;
  stakingState: NFTStakingState;
}

export const StakeInfo: React.FC<StakeInfoProps> = ({ address, stakingState }) => {
  const { data: balance } = useBalance({ address });

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Available to Stake</p>
        <p className="text-2xl font-bold">{balance?.formatted || '0'} ETH</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Currently Staked</p>
        <p className="text-2xl font-bold">{stakingState.stakedNFTs} NFTs</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Earned Rewards</p>
        <p className="text-2xl font-bold">{formatEther(stakingState.rewards)} ETH</p>
      </div>

      {stakingState.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {stakingState.error}
        </div>
      )}
    </div>
  );
};