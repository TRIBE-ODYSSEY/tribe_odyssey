import { useState, useCallback, useEffect } from 'react';
import { useAlchemyProvider } from './useAlchemyProvider';
import { toast } from 'react-toastify';
import { BrowserProvider } from 'ethers';

export const useAlchemyAuth = () => {
  const { getProvider } = useAlchemyProvider();
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  const connect = useCallback(async () => {
    try {
      const provider = await getProvider();
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      setProvider(provider);
      setAddress(address);
      setIsConnected(true);
      localStorage.setItem('walletConnected', 'true');
      
      return { address, provider, signer };
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect wallet');
      throw error;
    }
  }, [getProvider]);

  const disconnect = useCallback(async () => {
    try {
      setProvider(null);
      setAddress(null);
      setIsConnected(false);
      localStorage.removeItem('walletConnected');
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
      if (!provider) {
        throw new Error('Provider not initialized');
      }

      await provider.send('wallet_switchEthereumChain', [{ chainId: '0x1' }]);
    } catch (error) {
      console.error('Network switch error:', error);
      toast.error('Failed to switch network');
      throw error;
    }
  }, [provider]);

  // Auto-reconnect on mount if previously connected
  useEffect(() => {
    const wasConnected = localStorage.getItem('walletConnected') === 'true';
    if (wasConnected) {
      connect().catch(console.error);
    }
  }, [connect]);

  return { 
    connect, 
    disconnect, 
    switchNetwork, 
    isConnected, 
    address,
    provider 
  };
}; 