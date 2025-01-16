// context/RaffleContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { IRaffleDetails } from '../types/Raffle.types';

interface RaffleContextType {
  currentRaffle: IRaffleDetails | null;
  setCurrentRaffle: (raffle: IRaffleDetails | null) => void;
  refreshTrigger: number;
  refreshRaffles: () => void;
}

const RaffleContext = createContext<RaffleContextType | null>(null);

export const RaffleProvider = ({ children }: { children: ReactNode }) => {
  const [currentRaffle, setCurrentRaffle] = useState<IRaffleDetails | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshRaffles = () => setRefreshTrigger(prev => prev + 1);

  return (
    <RaffleContext.Provider 
      value={{ 
        currentRaffle, 
        setCurrentRaffle, 
        refreshTrigger, 
        refreshRaffles 
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