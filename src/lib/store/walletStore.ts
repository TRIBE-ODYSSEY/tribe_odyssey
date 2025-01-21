import { create } from 'zustand';

interface WalletState {
  selectedWallet: string | null;
  address: string | null;
  balance: string | null;
  network: string | null;
  loading: boolean;
  error: string | null;
}

interface WalletActions {
  setWallet: (wallet: string) => void;
  setAddress: (address: string) => void;
  setBalance: (balance: string) => void;
  setNetwork: (network: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useWalletStore = create<WalletState & WalletActions>((set) => ({
  selectedWallet: null,
  address: null,
  balance: null,
  network: null,
  loading: false,
  error: null,

  setWallet: (wallet) => set({ selectedWallet: wallet }),
  setAddress: (address) => set({ address }),
  setBalance: (balance) => set({ balance }),
  setNetwork: (network) => set({ network }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () => set({ 
    selectedWallet: null, 
    address: null,
    balance: null, 
    network: null, 
    error: null 
  })
})); 