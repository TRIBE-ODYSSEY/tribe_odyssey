import { useWalletStore } from '../store';
import { publicClient, walletClient } from '../viem/clients';
import { formatEther, parseEther } from 'viem';
import type { Address, Hash } from 'viem';
import { ContractName, writeContract } from '../wagmi/actions/contracts';

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
  },

  registerENS: async (domainName: string): Promise<Hash> => {
    const store = useWalletStore.getState();
    store.setLoading(true);
    
    try {
      return await writeContract(
        import.meta.env.VITE_ENS_REGISTRAR_ADDRESS as Address,
        'ENSRegistrar' as ContractName,
        'register',
        [domainName, parseEther('0.01')] // Example cost, adjust as needed
      );
    } catch (error) {
      store.setError('Failed to register ENS domain');
      throw error;
    } finally {
      store.setLoading(false);
    }
  }
};