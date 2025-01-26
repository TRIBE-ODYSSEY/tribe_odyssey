import { useState, useCallback } from 'react';
import { useAlchemyProvider } from './useAlchemyProvider';
import { toast } from 'react-toastify';

export const useAlchemyAuth = () => {
  const { getProvider } = useAlchemyProvider();
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const connect = useCallback(async (walletType?: string) => {
    try {
      const provider = await getProvider();
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      
      // Verify network
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);
      
      if (chainId !== 1) { // Mainnet
        await switchNetwork();
      }

      setAddress(userAddress);
      setIsConnected(true);
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletType', walletType || 'metamask');
      
      return { address: userAddress, chainId };
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect wallet');
      throw error;
    }
  }, [getProvider]);

  const disconnect = useCallback(async () => {
    try {
      localStorage.removeItem('walletConnected');
      localStorage.removeItem('walletType');
      setAddress(null);
      setIsConnected(false);
      window.dispatchEvent(new Event('wallet_disconnected'));
      return true;
    } catch (error) {
      console.error('Disconnect error:', error);
      toast.error('Failed to disconnect wallet');
      throw error;
    }
  }, []);

  const switchNetwork = useCallback(async () => {
    try {
      const provider = await getProvider();
      await provider.send('wallet_switchEthereumChain', [{ chainId: '0x1' }]);
    } catch (error) {
      console.error('Network switch error:', error);
      toast.error('Failed to switch network');
      throw error;
    }
  }, [getProvider]);

  return { connect, disconnect, switchNetwork, isConnected, address };
}; 