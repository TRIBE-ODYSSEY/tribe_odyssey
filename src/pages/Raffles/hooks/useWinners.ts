import { useEffect, useState } from "react";
import { RaffleDetails } from '../types/Raffle.types';
import { randomPicker } from '../services/randomPicker';
import { toast } from 'react-toastify';

interface UseWinnersReturn {
  raffles: RaffleDetails[];
  error: string | null;
  loading: boolean;
}

const useWinners = (trigger: number): UseWinnersReturn => {
  const [raffles, setRaffles] = useState<RaffleDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        setLoading(true);
        const response = await randomPicker.getProjectDetails('completed');
        if (response.success) {
          setRaffles(response.data);
          setError(null);
        } else {
          setError(response.error || 'Failed to load winners');
          toast.error(response.error || 'Failed to load winners');
        }
      } catch (error) {
        console.error('Failed to fetch winners:', error);
        setError('Failed to load winners');
        toast.error('Failed to load winners');
      } finally {
        setLoading(false);
      }
    };

    fetchWinners();
  }, [trigger]);

  return { raffles, error, loading };
};

export default useWinners;
