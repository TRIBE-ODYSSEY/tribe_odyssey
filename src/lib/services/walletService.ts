import { useWalletStore } from '../store';
import { publicClient, walletClient } from '../viem/clients';
import { formatEther } from 'viem';
import type { Address } from 'viem';

export const walletService = {
  getBalance: async (address: Address) => {
    const store = useWalletStore.getState();
    store.setLoading(true);
    
    try {
      const balance = await publicClient.getBalance({ address });
      const formattedBalance = formatEther(balance);
      store.setBalance(formattedBalance);
      return formattedBalance;
    } catch (error) {
      store.setError('Failed to fetch balance');
      return null;
    } finally {
      store.setLoading(false);
    }
  },

  getNetwork: async () => {
    const store = useWalletStore.getState();
    store.setLoading(true);
    
    try {
      const chainId = await walletClient.getChainId();
      const network = chainId === 1 ? 'mainnet' : 'testnet';
      store.setNetwork(network);
      return network;
    } catch (error) {
      store.setError('Failed to fetch network');
      return null;
    } finally {
      store.setLoading(false);
    }
  }
};