import { useState, useEffect } from "react";
import { RaffleDetails } from '../types/Raffle.types';
import { raffleService } from '@src/services/RaffleService';
import { useAlchemy } from '@src/lib/hooks/useAlchemy';
import { toast } from 'react-toastify';

const useRaffles = (onlyOpen: boolean, trigger: number) => {
  const { address } = useAlchemy();
  const [raffles, setRaffles] = useState<RaffleDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRaffles = async () => {
      try {
        setLoading(true);
        const status = onlyOpen ? 'active' : undefined;
        const response = await raffleService.getAllRaffles(status);
        setRaffles(response);
        setError(null);
      } catch (error: any) {
        console.error('Error fetching raffles:', error);
        setError(error.message || "Failed to fetch raffles");
        toast.error(error.message || "Failed to fetch raffles");
        setRaffles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRaffles();
  }, [onlyOpen, trigger, address]);

  return { raffles, loading, error };
};

export default useRaffles;
