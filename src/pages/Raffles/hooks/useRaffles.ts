import axios from "axios";
import { useEffect, useState } from "react";
import { RaffleDetails } from '../types/Raffle.types';

interface UseRafflesReturn {
  raffles: RaffleDetails[];
  loading: boolean;
  error: string | null;
}

const useRaffles = (onlyOpen: boolean, trigger: number): UseRafflesReturn => {
  const [raffles, setRaffles] = useState<RaffleDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/staking/raffles", { 
          params: { status: onlyOpen ? 'active' : 'all' } 
        });
        setRaffles(response.data?.raffles || []);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Error fetching raffles");
        setRaffles([]);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [onlyOpen, trigger]);

  return { raffles, loading, error };
};

export default useRaffles;
