import { useState, useCallback } from 'react';
import { ethers, BrowserProvider, JsonRpcSigner } from 'ethers';
import { toast } from 'react-toastify';
import { Eip1193Provider } from 'ethers';

export const useAlchemyProvider = () => {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  const getProvider = useCallback(async (): Promise<BrowserProvider> => {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        throw new Error('Window is not defined');
      }
      
      // Get the ethereum object from window
      const ethereum = (window as any).ethereum as Eip1193Provider;
      if (!ethereum) {
        throw new Error('No Web3 provider found. Please install a wallet.');
      }

      // Initialize provider
      const provider = new ethers.BrowserProvider(ethereum, {
        name: 'Tribe Odyssey',
        chainId: 1 // Ethereum Mainnet
      });

      // Cache the provider instance
      setProvider(provider);
      
      // Listen for network changes
      provider.on('network', () => {
        window.location.reload();
      });

      // Listen for account changes
      provider.on('accountsChanged', () => {
        window.location.reload();
      });

      return provider;
    } catch (error) {
      console.error('Provider error:', error);
      toast.error('Failed to initialize provider');
      throw error;
    }
  }, []);

  const getSigner = useCallback(async (): Promise<JsonRpcSigner> => {
    try {
      const provider = await getProvider();
      const signer = await provider.getSigner();
      
      if (!signer) {
        throw new Error('No signer available');
      }
      
      return signer;
    } catch (error) {
      console.error('Signer error:', error);
      toast.error('Please connect your wallet first');
      throw error;
    }
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