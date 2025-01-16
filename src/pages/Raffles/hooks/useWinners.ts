import { useState, useEffect } from "react";
import { RaffleDetails } from '../types/Raffle.types';
import { raffleService } from '@src/services/RaffleService';

const useWinners = (trigger: number) => {
  const [raffles, setRaffles] = useState<RaffleDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        setLoading(true);
        const response = await raffleService.getAllRaffles('completed');
        setRaffles(response);
      } catch (error) {
        setError("Failed to fetch winners");
        setRaffles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWinners();
  }, [trigger]);

  return { raffles, loading, error };
};

export default useWinners;
