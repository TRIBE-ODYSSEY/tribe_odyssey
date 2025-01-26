import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAlchemy } from '../hooks/useAlchemy';
import type { Address } from 'viem';
import { toast } from 'react-toastify';

interface AlchemyContextType {
  address: Address | null;
  isConnecting: boolean;
  isConnected: boolean;
  connect: (walletType: string) => Promise<void>;
  disconnect: () => Promise<void>;
  error: Error | null;
  walletType: string | null;
}

const AlchemyContext = createContext<AlchemyContextType | undefined>(undefined);

export const AlchemyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<Address | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [walletType, setWalletType] = useState<string | null>(null);

  useEffect(() => {
    // Check if previously connected
    const wasConnected = localStorage.getItem('walletConnected') === 'true';
    const savedWalletType = localStorage.getItem('walletType');
    
    const checkConnection = async () => {
      try {
        if (wasConnected && savedWalletType) {
          const addr = await useAlchemy().connect();
          if (addr) {
            setAddress(addr.address as Address);
            setIsConnected(true);
            setWalletType(savedWalletType);
          }
        }
      } catch (err) {
        console.error('Connection check error:', err);
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('walletType');
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
          setWalletType(null);
          localStorage.removeItem('walletConnected');
          localStorage.removeItem('walletType');
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
        setWalletType(null);
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('walletType');
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

  const connect = async (walletType: string) => {
    setIsConnecting(true);
    setError(null);
    try {
      // Check if the selected wallet is installed
      if (walletType === 'metamask' && !window.ethereum?.isMetaMask) {
        throw new Error('MetaMask is not installed');
      } else if (walletType === 'coinbase' && !window.ethereum?.isCoinbaseWallet) {
        throw new Error('Coinbase Wallet is not installed');
      } else if (walletType === 'trust' && !window.ethereum?.isTrust) {
        throw new Error('Trust Wallet is not installed');
      } else if (walletType === 'brave' && !window.ethereum?.isBrave) {
        throw new Error('Brave Wallet is not installed');
      }

      const { address: addr } = await useAlchemy().connect();
      setAddress(addr as Address);
      setIsConnected(true);
      setWalletType(walletType);
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletType', walletType);
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
      await useAlchemy().disconnect();
      setAddress(null);
      setIsConnected(false);
      setWalletType(null);
      localStorage.removeItem('walletConnected');
      localStorage.removeItem('walletType');
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
        error,
        walletType
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