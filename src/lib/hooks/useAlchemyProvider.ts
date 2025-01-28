import { useState, useCallback, useEffect } from 'react';
import { ethers, BrowserProvider } from 'ethers';
import { toast } from 'react-toastify';

export const useAlchemyProvider = () => {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  const getProvider = useCallback(async (): Promise<BrowserProvider> => {
    try {
      if (typeof window === 'undefined') {
        throw new Error('Window is not defined');
      }
      
      const ethereum = (window as any).ethereum;
      if (!ethereum) {
        throw new Error('No Web3 provider found. Please install a wallet.');
      }

      // Create provider with proper event handling
      const provider = new ethers.BrowserProvider(ethereum);

      // Proper event listeners with type checking
      ethereum.on('accountsChanged', (_accounts: string[]) => {
        // Handle account change by refreshing the page
        window.location.reload();
      });

      ethereum.on('chainChanged', (_chainId: string) => {
        // Handle chain change by refreshing the page
        window.location.reload();
      });

      ethereum.on('disconnect', (error: { code: number; message: string }) => {
        console.log('Wallet disconnected:', error);
        // Clear any necessary state
        setProvider(null);
      });

      setProvider(provider);
      return provider;
    } catch (error) {
      console.error('Provider error:', error);
      toast.error('Failed to initialize provider');
      throw error;
    }
  }, []);

  // Add cleanup for event listeners
  useEffect(() => {
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
        window.ethereum.removeListener('disconnect', () => {});
      }
    };
  }, []);

  const getSigner = useCallback(async () => {
    const provider = await getProvider();
    return provider.getSigner();
  }, [getProvider]);

  const getNetwork = useCallback(async () => {
    try {
      const provider = await getProvider();
      return await provider.getNetwork();
    } catch (error) {
      console.error('Network error:', error);
      throw error;
    }
  }, [getProvider]);

  const getBalance = useCallback(async (address: string) => {
    try {
      const provider = await getProvider();
      return await provider.getBalance(address);
    } catch (error) {
      console.error('Balance error:', error);
      throw error;
    }
  }, [getProvider]);

  return {
    provider,
    getProvider,
    getSigner,
    getNetwork,
    getBalance
  };
}; 