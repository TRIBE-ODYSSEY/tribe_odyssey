export interface Raffle {
  id: string;
  title: string;
  description: string;
  endDate: Date;
  prizeImage: string;
  prizeValue: string;
  project_key: string;
  nft_id: string;
  winner?: string;
  conditions: {
    entry: number;
    points: number;
  }[];
  only_allow_once: boolean;
  participantCount: number;
  status: 'active' | 'completed' | 'cancelled';
}

export interface RaffleDetails extends Raffle {
  participants: {
    address: string;
    points: number;
    joinedAt: Date;
  }[];
}

export interface CompletedRaffle {
  id: string;
  title: string;
  description: string;
  endDate: Date;
  ended_at: string;
  prizeImage: string;
  winner: string;
  prizeValue: string;
  participantCount: number;
  project_key: string;
}