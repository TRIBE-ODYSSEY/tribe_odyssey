import axios from "axios";
import { useEffect, useState } from "react";

const useRaffles = (onlyOpen: boolean, trigger: number) => {
  const [raffles, setRaffles] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      axios
        .get("/staking/raffles", { params: { onlyOpen: onlyOpen } })
        .then((response) => {
          setRaffles(response.data.raffles);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetch();
  }, [onlyOpen, trigger]);

  return {
    raffles,
  };
};

export default useRaffles;
