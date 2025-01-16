import { useState, useEffect } from "react";
import { RaffleDetails, Participant, Winner } from '../types/Raffle.types';
import { raffleService } from '@src/services/RaffleService';

const useRaffle = (id: string, trigger: number) => {
  const [raffle, setRaffle] = useState<RaffleDetails | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [activities, setActivities] = useState<Participant[]>([]);
  const [winner, setWinner] = useState<Winner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRaffleData = async () => {
      try {
        setLoading(true);
        const [raffleData, entries] = await Promise.all([
          raffleService.getRaffle(id),
          raffleService.getRaffleEntries(id)
        ]);

        setRaffle(raffleData);
        setParticipants(entries);
        // Get last 5 entries for activities
        setActivities(entries.slice(-5).reverse());
        
        if (raffleData.project_status === 'completed') {
          const result = await raffleService.drawRaffle(id);
          setWinner(result.winner);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching raffle data:', err);
        setError("Failed to fetch raffle details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRaffleData();
    }
  }, [id, trigger]);

  return { raffle, participants, activities, winner, loading, error };
};

export default useRaffle;
