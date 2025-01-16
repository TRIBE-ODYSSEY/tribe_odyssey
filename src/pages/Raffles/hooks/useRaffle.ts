import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RaffleDetails, Participant, Activity, Winner } from '../types/Raffle.types';

interface UseRaffleReturn {
  raffle: RaffleDetails | null;
  participants: Participant[];
  activities: Activity[];
  winner: Winner | null;
  loading: boolean;
  error: string | null;
}

const useRaffle = (id: string, trigger: number): UseRaffleReturn => {
  const [raffle, setRaffle] = useState<RaffleDetails | null>(null);
  const [winner, setWinner] = useState<Winner | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/staking/raffle", { params: { id } });
        setRaffle(response.data.raffle);
        setParticipants(response.data.participants);
        setActivities(response.data.activities);
        setWinner(response.data.winner);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Error fetching raffle details");
        toast.error("Error fetching raffle details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetch();
    }
  }, [id, trigger]);

  return { raffle, participants, activities, winner, loading, error };
};

export default useRaffle;
