import { useState, useEffect } from 'react';
import { randomPicker } from '../services/randomPicker';
import { 
  IRaffleDetails, 
  Participant, 
  Activity, 
  Winner, 
  ApiResponse 
} from '../types';

interface UseRaffleReturn {
  raffle: IRaffleDetails | null;
  participants: Participant[];
  activities: Activity[];
  winner: Winner | null;
  loading: boolean;
  error: string | null;
}

export const useRaffle = (id: string | undefined, trigger: number): UseRaffleReturn => {
  const [raffle, setRaffle] = useState<IRaffleDetails | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [winner, setWinner] = useState<Winner | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRaffleData = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const raffleResponse: ApiResponse<IRaffleDetails[]> = await randomPicker.getProjectDetails(id);
        
        if (raffleResponse.success && raffleResponse.data?.[0]) {
          setRaffle(raffleResponse.data[0]);
          
          const [participantsRes, activitiesRes]: [
            ApiResponse<Participant[]>,
            ApiResponse<Activity[]>
          ] = await Promise.all([
            randomPicker.getParticipants(id),
            randomPicker.getActivities(id)
          ]);

          if (participantsRes.success) {
            setParticipants(participantsRes.data);
          }

          if (activitiesRes.success) {
            setActivities(activitiesRes.data);
          }

          if (raffleResponse.data[0].project_status === 'Completed') {
            const winnerRes: ApiResponse<Winner> = await randomPicker.getWinner(id);
            if (winnerRes.success) {
              setWinner(winnerRes.data);
            }
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch raffle data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRaffleData();
  }, [id, trigger]);

  return { 
    raffle, 
    participants, 
    activities, 
    winner,
    loading,
    error
  };
}; 