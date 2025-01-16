import axios from "axios";
import { useEffect, useState } from "react";
import { RaffleDetails } from '../types/Raffle.types';

interface UseWinnersReturn {
  raffles: RaffleDetails[];
  error: string | null;
}

const useWinners = (trigger: number): UseWinnersReturn => {
  const [raffles, setRaffles] = useState<RaffleDetails[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      axios
        .get("/staking/raffles", { params: { onlyClosed: true } })
        .then((response) => {
          setRaffles(response.data.raffles);
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
        });
    };

    fetch();
  }, [trigger]);

  return { raffles, error };
};

export default useWinners;
