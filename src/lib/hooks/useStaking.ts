import { useCallback } from 'react';
import { stakingService } from '../services';
import { useStakingStore } from '../store';
import type { Address } from 'viem';

export const useStaking = () => {
  const { stakedNFTs, rewards, loading, error } = useStakingStore();

  const stake = useCallback(async (tokenIds: string[]) => {
    if (!tokenIds.length) return;
    return await stakingService.stakeNFTs(tokenIds);
  }, []);

  const unstake = useCallback(async (tokenIds: string[]) => {
    if (!tokenIds.length) return;
    return await stakingService.unstakeNFTs(tokenIds);
  }, []);

  const getStakedNFTs = useCallback(async (address: Address) => {
    return await stakingService.getStakedNFTs(address);
  }, []);

  const getRewards = useCallback(async (address: Address) => {
    return await stakingService.getRewards(address);
  }, []);

  return {
    stakedNFTs,
    rewards,
    loading,
    error,
    stake,
    unstake,
    getStakedNFTs,
    getRewards
  };
}; 