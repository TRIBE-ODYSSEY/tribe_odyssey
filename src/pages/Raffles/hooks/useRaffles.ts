import { useState, useEffect } from 'react';
import { randomPicker } from '../services/randomPicker';
import { IRaffleDetails, ApiResponse } from '../types';
import { toast } from 'react-toastify';

interface UseRafflesReturn {
  raffles: IRaffleDetails[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useRaffles = (activeOnly: boolean = false): UseRafflesReturn => {
  const [raffles, setRaffles] = useState<IRaffleDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRaffles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const status = activeOnly ? 'active' : 'all';
      const response: ApiResponse<IRaffleDetails[]> = await randomPicker.getProjectDetails(status);
      
      if (response.success) {
        // Sort raffles by date if active only
        const sortedRaffles = activeOnly 
          ? response.data.sort((a, b) => 
              new Date(a.raffle_at).getTime() - new Date(b.raffle_at).getTime()
            )
          : response.data;
          
        setRaffles(sortedRaffles);
      } else {
        const errorMessage = response.error || 'Failed to fetch raffles';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRaffles();
  }, [activeOnly]);

  return {
    raffles,
    loading,
    error,
    refetch: fetchRaffles
  };
};
