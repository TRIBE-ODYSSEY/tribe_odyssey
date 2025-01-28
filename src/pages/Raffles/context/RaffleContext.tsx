// context/RaffleContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { RaffleDetails } from '../types/Raffle.types';
import { useAccount } from 'wagmi';

// Constants
const ADMIN_ADDRESSES = [
  '0xc570F1B8D14971c6cd73eA8db4F7C44E4AAdC6f2',
  '0xf7D579d80C6e01382D7BAa122B78310361122B5b'
].map(addr => addr.toLowerCase());

interface RaffleContextType {
  currentRaffle: RaffleDetails | null;
  setCurrentRaffle: (raffle: RaffleDetails | null) => void;
  refreshTrigger: number;
  refreshRaffles: () => void;
  isAdmin: boolean;
  raffles: RaffleDetails[];
  setRaffles: (raffles: RaffleDetails[]) => void;
}

const RaffleContext = createContext<RaffleContextType | null>(null);

export const RaffleProvider = ({ children }: { children: ReactNode }) => {
  const { address } = useAccount();
  const [currentRaffle, setCurrentRaffle] = useState<RaffleDetails | null>(null);
  const [raffles, setRaffles] = useState<RaffleDetails[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshRaffles = () => setRefreshTrigger(prev => prev + 1);
  
  const isAdmin = Boolean(
    address && 
    (ADMIN_ADDRESSES.includes(address.toLowerCase()) || 
    currentRaffle?.admin_address.toLowerCase() === address.toLowerCase())
  );

  return (
    <RaffleContext.Provider 
      value={{ 
        currentRaffle, 
        setCurrentRaffle,
        raffles,
        setRaffles, 
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