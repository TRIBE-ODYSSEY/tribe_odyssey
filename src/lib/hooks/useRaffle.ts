import axios from "axios";
import { useEffect, useState } from "react";

const useRaffle = (id: string, trigger: number) => {
  const [raffle, setRaffle] = useState<any>();
  const [winner, setWinner] = useState<any>();
  const [participants, setParticipants] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      axios
        .get("/staking/raffle", { params: { id: id } })
        .then((response) => {
          setRaffle(response.data.raffle);
          setParticipants(response.data.participants);
          setActivities(response.data.activities);
          setWinner(response.data.winner);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    if (id) {
      fetch();
    }
  }, [id, trigger]);

  return {
    raffle,
    participants,
    activities,
    winner,
  };
};

export default useRaffle;
