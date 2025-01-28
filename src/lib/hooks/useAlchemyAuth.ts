import { useCallback, useState, useRef, useEffect } from 'react';
import { useAlchemyProvider } from './useAlchemyProvider';
import { toast } from 'react-toastify';
import type { BrowserProvider } from 'ethers';

export const useAlchemyAuth = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const { getProvider } = useAlchemyProvider();
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  
  // Connection state management
  const isConnecting = useRef(false);
  const connectionPromise = useRef<Promise<void> | null>(null);
  const lastConnectionAttempt = useRef(0);
  const MIN_RETRY_DELAY = 1000; // 1 second

  const waitForPreviousConnection = async () => {
    if (connectionPromise.current) {
      try {
        await connectionPromise.current;
      } catch (error) {
        // Previous connection failed, we can proceed with new attempt
        console.log('Previous connection attempt failed');
      }
    }
  };

  const connect = useCallback(async () => {
    // Prevent rapid repeated connection attempts
    const now = Date.now();
    if (now - lastConnectionAttempt.current < MIN_RETRY_DELAY) {
      toast.info('Please wait before trying again');
      return;
    }
    lastConnectionAttempt.current = now;

    // Wait for any previous connection attempt to complete
    await waitForPreviousConnection();

    if (isConnecting.current) {
      toast.info('Connection in progress...');
      return;
    }

    connectionPromise.current = (async () => {
      isConnecting.current = true;
      try {
        // Check if already connected
        if (isConnected && address) {
          console.log('Already connected');
          return;
        }

        const provider = await getProvider();
        setProvider(provider);

        // Get ethereum object
        const ethereum = (window as any).ethereum;
        if (!ethereum) {
          throw new Error('No Web3 provider found');
        }

        // Check if already connected first
        const accounts = await ethereum.request({ 
          method: 'eth_accounts' 
        });

        if (accounts && accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
          localStorage.setItem('walletConnected', 'true');
          toast.success('Wallet connected successfully');
          return;
        }

        // If not connected, request accounts
        const newAccounts = await ethereum.request({ 
          method: 'eth_requestAccounts' 
        });

        if (newAccounts && newAccounts.length > 0) {
          setAddress(newAccounts[0]);
          setIsConnected(true);
          localStorage.setItem('walletConnected', 'true');
          toast.success('Wallet connected successfully');
        } else {
          throw new Error('No accounts found');
        }

      } catch (error: any) {
        console.error('Connection error:', error);
        
        if (error.code === -32002) {
          toast.warning('Please check MetaMask popup');
        } else if (error.code === 4001) {
          toast.error('Connection rejected by user');
        } else {
          toast.error('Failed to connect wallet');
        }
        
        setIsConnected(false);
        setAddress(null);
        localStorage.removeItem('walletConnected');
        
        throw error;
      } finally {
        isConnecting.current = false;
      }
    })();

    try {
      await connectionPromise.current;
    } catch (error) {
      // Error already handled above
    }
  }, [getProvider, isConnected, address]);

  const disconnect = useCallback(async () => {
    try {
      setIsConnected(false);
      setAddress(null);
      setProvider(null);
      localStorage.removeItem('walletConnected');
      toast.success('Wallet disconnected');
    } catch (error) {
      console.error('Disconnect error:', error);
      toast.error('Failed to disconnect wallet');
    }
  }, []);

  const switchNetwork = useCallback(async () => {
    try {
      if (!provider) {
        throw new Error('Provider not initialized');
      }

      await provider.send('wallet_switchEthereumChain', [{ chainId: '0x1' }]);
      toast.success('Network switched successfully');
    } catch (error: any) {
      console.error('Network switch error:', error);
      if (error.code === 4902) {
        toast.error('Network not available. Please add the network to your wallet first.');
      } else {
        toast.error('Failed to switch network');
      }
      throw error;
    }
  }, [provider]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isConnecting.current = false;
      connectionPromise.current = null;
    };
  }, []);

  return {
    connect,
    disconnect,
    switchNetwork,
    isConnected,
    address,
    provider
  };
}; 