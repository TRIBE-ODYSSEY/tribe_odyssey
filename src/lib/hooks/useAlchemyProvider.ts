import { useState, useCallback } from 'react';
import { ethers, BrowserProvider, JsonRpcSigner } from 'ethers';

export const useAlchemyProvider = () => {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  const getProvider = useCallback(async (): Promise<BrowserProvider> => {
    if (typeof window === 'undefined') {
      throw new Error('Window is not defined');
    }
    
    const ethereum = window.ethereum;
    if (!ethereum) {
      throw new Error('No Web3 provider found. Please install a wallet.');
    }

    try {
      const provider = new ethers.BrowserProvider(ethereum);
      setProvider(provider);
      return provider;
    } catch (error) {
      console.error('Provider error:', error);
      throw new Error('Failed to initialize provider');
    }
  }, []);

  const getSigner = useCallback(async (): Promise<JsonRpcSigner> => {
    try {
      const provider = await getProvider();
      const signer = await provider.getSigner();
      if (!signer) throw new Error('No signer available');
      return signer;
    } catch (error) {
      console.error('Signer error:', error);
      throw new Error('Please connect your wallet first');
    }
  }, [getProvider]);

  return { getProvider, getSigner, provider };
}; 