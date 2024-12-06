import React from 'react';
import { Button } from '../../ui/Button';
import { NFTStakingState } from '../../../hooks/useNFTStaking';

interface StakeActionsProps {
  onStake: () => void;
  onUnstake: () => void;
  stakingState: NFTStakingState;
}

export const StakeActions: React.FC<StakeActionsProps> = ({
  onStake,
  onUnstake,
  stakingState,
}) => {
  const isDisabled = !stakingState.stakedNFTs && stakingState.isUnstaking;

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button
          onClick={onStake}
          disabled={stakingState.isStaking}
          className="flex-1 bg-primary text-white hover:bg-primary-dark disabled:opacity-50"
        >
          {stakingState.isStaking ? 'Staking...' : 'Stake NFT'}
        </Button>
        <Button
          onClick={onUnstake}
          disabled={isDisabled || stakingState.isUnstaking}
          className="flex-1 bg-secondary text-white hover:bg-secondary-dark disabled:opacity-50"
        >
          {stakingState.isUnstaking ? 'Unstaking...' : 'Unstake NFT'}
        </Button>
      </div>

      <Button
        onClick={onStake}
        disabled={!stakingState.rewards || stakingState.isStaking}
        className="w-full bg-primary-dark text-white hover:bg-primary disabled:opacity-50"
      >
        Claim Rewards
      </Button>
    </div>
  );
};