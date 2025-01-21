import { create } from 'zustand';

interface StakedNFT {
  tokenId: string;
  stakedAt: number;
  rewards: string;
}

interface StakingState {
  stakedNFTs: StakedNFT[];
  rewards: string;
  loading: boolean;
  error: string | null;
}

interface StakingActions {
  setStakedNFTs: (nfts: StakedNFT[]) => void;
  setRewards: (rewards: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useStakingStore = create<StakingState & StakingActions>((set) => ({
  stakedNFTs: [],
  rewards: '0',
  loading: false,
  error: null,

  setStakedNFTs: (nfts) => set({ stakedNFTs: nfts }),
  setRewards: (rewards) => set({ rewards }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () => set({ 
    stakedNFTs: [], 
    rewards: '0', 
    error: null 
  })
})); 