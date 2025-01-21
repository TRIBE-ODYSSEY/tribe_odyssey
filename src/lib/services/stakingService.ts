import { useStakingStore } from '../store';
import { writeContract, readContract } from '../wagmi/actions/contracts';
import type { Address, Hash } from 'viem';
import { formatEther } from 'viem';

interface StakedNFT {
  tokenId: string;
  stakedAt: number;
  rewards: string;
}

export const stakingService = {
  stakeNFTs: async (tokenIds: string[]): Promise<Hash> => {
    const store = useStakingStore.getState();
    store.setLoading(true);
    
    try {
      return await writeContract(
        import.meta.env.VITE_STAKING_CONTRACT_ADDRESS as Address,
        'staking',
        'joinMany',
        [BigInt(0), tokenIds.map(id => BigInt(id))] as const
      );
    } catch (error) {
      store.setError('Failed to stake NFTs');
      throw error;
    } finally {
      store.setLoading(false);
    }
  },

  unstakeNFTs: async (tokenIds: string[]): Promise<Hash> => {
    const store = useStakingStore.getState();
    store.setLoading(true);
    
    try {
      return await writeContract(
        import.meta.env.VITE_STAKING_CONTRACT_ADDRESS as Address,
        'staking',
        'leaveMany',
        [BigInt(0), tokenIds.map(id => BigInt(id))] as const
      );
    } catch (error) {
      store.setError('Failed to unstake NFTs');
      throw error;
    } finally {
      store.setLoading(false);
    }
  },

  getStakedNFTs: async (address: Address) => {
    const store = useStakingStore.getState();
    store.setLoading(true);
    
    try {
      const stakedTokens = await readContract(
        import.meta.env.VITE_STAKING_CONTRACT_ADDRESS as Address,
        'staking',
        'getStakedTokens',
        [address]
      );
      store.setStakedNFTs(stakedTokens as StakedNFT[]);
      return stakedTokens;
    } catch (error) {
      store.setError('Failed to fetch staked NFTs');
      return [];
    } finally {
      store.setLoading(false);
    }
  },

  getRewards: async (address: Address) => {
    const store = useStakingStore.getState();
    store.setLoading(true);
    
    try {
      const rewards = await readContract(
        import.meta.env.VITE_STAKING_CONTRACT_ADDRESS as Address,
        'staking',
        'getRewards',
        [address]
      );
      const formattedRewards = formatEther(rewards as bigint);
      store.setRewards(formattedRewards);
      return formattedRewards;
    } catch (error) {
      store.setError('Failed to fetch rewards');
      return '0';
    } finally {
      store.setLoading(false);
    }
  }
}; 