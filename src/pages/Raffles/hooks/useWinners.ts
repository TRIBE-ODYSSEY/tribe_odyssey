import { useEffect, useState } from "react";
import { RaffleDetails } from '../types/Raffle.types';
import axios from "axios";

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
      setLoading(true);
      axios
        .get("/staking/raffles", { params: { onlyClosed: true } })
        .then((response) => {
          setRaffles(response.data.raffles);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
          setLoading(false);
        });
    };

    fetchWinners();
  }, [trigger]);

  return { raffles, error, loading };
};

export default useWinners;
