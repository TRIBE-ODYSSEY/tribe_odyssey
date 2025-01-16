import axios from "axios";
import { useEffect, useState } from "react";
import { IRaffleDetails } from '../types/Raffle.types';

interface UseWinnersReturn {
  raffles: IRaffleDetails[];
  error: string | null;
}

const useWinners = (trigger: number): UseWinnersReturn => {
  const [raffles, setRaffles] = useState<IRaffleDetails[]>([]);
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
