import { useState, useEffect } from "react";
import { RaffleDetails } from '../types/Raffle.types';
import { raffleService } from '@src/services/RaffleService';
import { useAlchemy } from '@src/lib/hooks/useAlchemy';
import { toast } from 'react-toastify';

const useWinners = (trigger: number) => {
  const { address } = useAlchemy();
  const [raffles, setRaffles] = useState<RaffleDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        setLoading(true);
        const response = await raffleService.getAllRaffles('completed');
        setRaffles(response);
        setError(null);
      } catch (error: any) {
        console.error('Error fetching winners:', error);
        setError(error.message || "Failed to fetch winners");
        toast.error(error.message || "Failed to fetch winners");
        setRaffles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWinners();
  }, [trigger, address]);

  return { raffles, loading, error };
};

export default useWinners;
