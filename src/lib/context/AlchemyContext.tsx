import React, { createContext, useContext, useState } from 'react';
import { useAlchemy } from '../hooks/useAlchemy';
import { toast } from 'react-toastify';
import { BrowserProvider } from 'ethers';

interface AlchemyContextType {
  address: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  error: Error | null;
  provider: BrowserProvider | null;
}

const AlchemyContext = createContext<AlchemyContextType | undefined>(undefined);

export const AlchemyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { connect, disconnect, isConnected, address, provider } = useAlchemy();

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      await connect();
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

  const handleDisconnect = async () => {
    try {
      await disconnect();
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
        connect: handleConnect,
        disconnect: handleDisconnect,
        error,
        provider
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