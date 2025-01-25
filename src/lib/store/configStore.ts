import { create } from 'zustand';
import { Network } from 'alchemy-sdk';

interface ConfigState {
  apiUrl: string;
  chainId: number;
  networkName: Network;
  alchemyApiKey: string;
  contractAddresses: {
    [key: string]: string;
  };
}

interface ConfigActions {
  setApiUrl: (url: string) => void;
  setChainId: (chainId: number) => void;
  setNetworkName: (name: Network) => void;
  setContractAddress: (name: string, address: string) => void;
}

export const useConfigStore = create<ConfigState & ConfigActions>((set) => ({
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  chainId: Number(import.meta.env.VITE_CHAIN_ID) || 1,
  networkName: Network.ETH_MAINNET,
  alchemyApiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  contractAddresses: {
    'tribe': import.meta.env.VITE_TRIBE_CONTRACT_ADDRESS || '',
    'staking': import.meta.env.VITE_STAKING_CONTRACT_ADDRESS || '',
    'multicall': import.meta.env.VITE_MULTICALL_CONTRACT_ADDRESS || '',
    'ensRegistrar': import.meta.env.VITE_ENS_REGISTRAR_CONTRACT_ADDRESS || '',
    'ape': import.meta.env.VITE_APE_CONTRACT_ADDRESS || '',
  },

  setApiUrl: (url) => set({ apiUrl: url }),
  setChainId: (chainId) => set({ chainId }),
  setNetworkName: (name) => set({ networkName: name }),
  setContractAddress: (name, address) => 
    set((state) => ({
      contractAddresses: {
        ...state.contractAddresses,
        [name]: address
      }
    }))
})); 