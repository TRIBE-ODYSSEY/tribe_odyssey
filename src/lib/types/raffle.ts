export interface RaffleData {
    id: string;
    nft_id: string;
    project_name: string;
    project_status: 'Open' | 'Closed' | 'Finished';
    prize_image: string;
    description: string;
    raffle_at: string;
    ended_at?: string;
    winner?: string;
    entry_count: number;
    conditions: RaffleCondition[];
  }
  
  export interface RaffleCondition {
    id: string;
    points: number;
    entry: number;
  }
  
  export interface Participant {
    id: string;
    address: string;
    entry: number;
    entered_at: string;
    user?: {
      name: string;
      profile_image: string;
      btc_address?: string;
    };
  }
  
  export interface Activity {
    id: string;
    address: string;
    entry: number;
    entered_at: string;
    user?: {
      name: string;
      profile_image: string;
    };
  }
  
  export interface RaffleWinner {
    address: string;
    name?: string;
    profile_image?: string;
    btc_address?: string;
  }
  
  // API Response types
  export interface RaffleResponse {
    raffle: RaffleData;
    participants: Participant[];
    activities: Activity[];
    winner?: RaffleWinner;
  }
  
  export interface RafflesListResponse {
    raffles: RaffleData[];
    total: number;
    page: number;
    limit: number;
  }
  
  // Request types
  export interface EnterRaffleRequest {
    id: string;
    points: number;
    address: string;
    signature: string;
  }
  
  export interface RaffleQueryParams {
    status?: 'Open' | 'Closed' | 'Finished';
    page?: number;
    limit?: number;
  }