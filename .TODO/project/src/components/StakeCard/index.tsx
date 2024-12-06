import React from 'react';
import { useAccount } from 'wagmi';
import { Coins, Lock } from 'lucide-react';
import { Card } from '../ui/Card';
import { StakeInfo } from './StakeInfo';
import { StakeActions } from './StakeActions';
import { useNFTStaking } from '../../hooks/useNFTStaking';

export const StakeCard = () => {
  const { address } = useAccount();
  const stakingState = useNFTStaking();

  return (
    <Card className="w-full max-w-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Coins className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold">Stake NFTs</h2>
        </div>
        <Lock className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-6">
        <StakeInfo address={address} stakingState={stakingState} />
        <StakeActions
          onStake={stakingState.stakeNFT}
          onUnstake={stakingState.unstakeNFT}
          stakingState={stakingState}
        />
      </div>
    </Card>
  );
};