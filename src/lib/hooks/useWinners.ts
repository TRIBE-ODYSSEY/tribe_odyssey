import axios from "axios";
import { useEffect, useState } from "react";

const useWinners = (trigger: number) => {
  const [raffles, setRaffles] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      axios
        .get("/staking/raffles", { params: { onlyClosed: true } })
        .then((response) => {
          setRaffles(response.data.raffles);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetch();
  }, [trigger]);

  return {
    raffles,
  };
};

export default useWinners;
