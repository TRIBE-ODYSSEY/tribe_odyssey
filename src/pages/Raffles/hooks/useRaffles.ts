import { useState, useEffect } from "react";
import { RaffleDetails } from '../types/Raffle.types';
import { raffleService } from '@src/services/RaffleService';

const useRaffles = (onlyOpen: boolean, trigger: number) => {
  const [raffles, setRaffles] = useState<RaffleDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRaffles = async () => {
      try {
        const status = onlyOpen ? 'active' : undefined;
        const response = await raffleService.getAllRaffles(status);
        setRaffles(response);
      } catch (error) {
        setError("Failed to fetch raffles");
        setRaffles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRaffles();
  }, [onlyOpen, trigger]);

  return { raffles, loading, error };
};

export default useRaffles;
