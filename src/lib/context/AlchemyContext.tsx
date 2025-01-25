import React, { createContext, useContext, useState, useEffect } from 'react';
import { alchemyService } from '../config/alchemy';
import type { Address } from 'viem';
import { toast } from 'react-toastify';

interface AlchemyContextType {
  address: Address | null;
  isConnecting: boolean;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  error: Error | null;
}

const AlchemyContext = createContext<AlchemyContextType | undefined>(undefined);

export const AlchemyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<Address | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Check if previously connected
    const wasConnected = localStorage.getItem('walletConnected') === 'true';
    
    const checkConnection = async () => {
      try {
        if (wasConnected) {
          const addr = await alchemyService.auth.getAddress();
          if (addr) {
            setAddress(addr as Address);
            setIsConnected(true);
          }
        }
      } catch (err) {
        console.error('Connection check error:', err);
        localStorage.removeItem('walletConnected');
      }
    };

    checkConnection();

    if (typeof window !== 'undefined' && window.ethereum) {
      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0] as Address);
          setIsConnected(true);
        } else {
          setAddress(null);
          setIsConnected(false);
          localStorage.removeItem('walletConnected');
        }
      });

      // Listen for chain changes
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });

      // Listen for disconnect
      window.ethereum.on('disconnect', () => {
        setAddress(null);
        setIsConnected(false);
        localStorage.removeItem('walletConnected');
      });
    }

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
        window.ethereum.removeListener('disconnect', () => {});
      }
    };
  }, []);

  const connect = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const { address: addr } = await alchemyService.auth.connect();
      setAddress(addr as Address);
      setIsConnected(true);
      toast.success('Wallet connected successfully!');
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error(error.message);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    try {
      await alchemyService.auth.disconnect();
      setAddress(null);
      setIsConnected(false);
      localStorage.removeItem('walletConnected');
      toast.success('Wallet disconnected successfully!');
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error(error.message);
      throw error;
    }
  };

  return (
    <AlchemyContext.Provider
      value={{
        address,
        isConnecting,
        isConnected,
        connect,
        disconnect,
        error
      }}
    >
      {children}
    </AlchemyContext.Provider>
  );
};

export const useAlchemyContext = () => {
  const context = useContext(AlchemyContext);
  if (context === undefined) {
    throw new Error('useAlchemyContext must be used within an AlchemyProvider');
  }
  return context;
}; 