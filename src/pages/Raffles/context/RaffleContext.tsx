// context/RaffleContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { RaffleDetails } from '../types/Raffle.types';
import { useAlchemy } from '@src/lib/hooks/useAlchemy';

interface RaffleContextType {
  currentRaffle: RaffleDetails | null;
  setCurrentRaffle: (raffle: RaffleDetails | null) => void;
  refreshTrigger: number;
  refreshRaffles: () => void;
  isAdmin: boolean;
}

const RaffleContext = createContext<RaffleContextType | null>(null);

export const RaffleProvider = ({ children }: { children: ReactNode }) => {
  const { address } = useAlchemy();
  const [currentRaffle, setCurrentRaffle] = useState<RaffleDetails | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshRaffles = () => setRefreshTrigger(prev => prev + 1);
  
  const isAdmin = Boolean(address && currentRaffle?.admin_address === address);

  return (
    <RaffleContext.Provider 
      value={{ 
        currentRaffle, 
        setCurrentRaffle, 
        refreshTrigger, 
        refreshRaffles,
        isAdmin
      }}
    >
      {children}
    </RaffleContext.Provider>
  );
};

export const useRaffleContext = () => {
  const context = useContext(RaffleContext);
  if (!context) {
    throw new Error('useRaffleContext must be used within a RaffleProvider');
  }
  return context;
};