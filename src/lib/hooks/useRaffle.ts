import axios from 'axios';
import { useEffect, useState } from 'react';

interface Participant {
  id: string;
  address: string;
  entries: number;
  timestamp: string;
}

interface Activity {
  id: string;
  type: 'entry' | 'win' | 'refund';
  address: string;
  amount: number;
  timestamp: string;
}

interface Winner {
  address: string;
  entries: number;
  winning_entry: number;
  timestamp: string;
}

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

interface RaffleResponse {
  raffle: Raffle;
  participants: Participant[];
  activities: Activity[];
  winner?: Winner;
  success: boolean;
}

const useRaffle = (id: string, trigger: number = 0) => {
  const [raffle, setRaffle] = useState<Raffle | null>(null);
  const [winner, setWinner] = useState<Winner | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchRaffleData = async () => {
      if (!id) return;

      setIsLoading(true);
      setError(null);

      try {
        const { data } = await axios.get<RaffleResponse>('/staking/raffle', {
          params: { id },
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (isMounted) {
          setRaffle(data.raffle);
          setParticipants(data.participants || []);
          setActivities(data.activities || []);
          setWinner(data.winner || null);
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error 
            ? err.message 
            : 'Failed to fetch raffle data';
          setError(errorMessage);
          console.error('Raffle fetch error:', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchRaffleData();

    return () => {
      isMounted = false;
    };
  }, [id, trigger]);

  return {
    raffle,
    participants,
    activities,
    winner,
    isLoading,
    error,
    hasData: !!raffle,
    isOpen: raffle?.status === 'open',
    isClosed: raffle?.status === 'closed'
  };
};

export default useRaffle;