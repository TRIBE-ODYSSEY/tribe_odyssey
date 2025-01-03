import axios from 'axios';
import { useEffect, useState } from 'react';

interface Raffle {
  id: string;
  nft_id: string;
  project_name: string;
  prize_image: string;
  raffle_at: string;
  entry_count: number;
  status: 'open' | 'closed';
  entry_price: number;
  max_entries?: number;
}

interface RafflesResponse {
  raffles: Raffle[];
  total: number;
  success: boolean;
}

const useRaffles = (onlyOpen: boolean = false, trigger: number = 0) => {
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchRaffles = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await axios.get<RafflesResponse>('/staking/raffles', {
          params: { onlyOpen },
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (isMounted && data?.raffles) {
          setRaffles(data.raffles);
        } else {
          setRaffles([]);
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error 
            ? err.message 
            : 'Failed to fetch raffles';
          setError(errorMessage);
          console.error('Raffles fetch error:', err);
          setRaffles([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchRaffles();

    return () => {
      isMounted = false;
    };
  }, [onlyOpen, trigger]);

  return {
    raffles: raffles || [],
    isLoading,
    error,
    hasData: Array.isArray(raffles) && raffles.length > 0,
    openRaffles: raffles.filter(raffle => raffle.status === 'open'),
    closedRaffles: raffles.filter(raffle => raffle.status === 'closed'),
    totalEntries: raffles.reduce((sum, raffle) => sum + (raffle.entry_count || 0), 0)
  };
};

export default useRaffles;
