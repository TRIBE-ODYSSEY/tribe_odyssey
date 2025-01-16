// Basic Types
export interface RaffleCondition {
  entry: number;
  points: number;
}

export interface IRaffleDetails {
  id: string;
  project_name: string;
  project_status: string;
  prize_image: string;
  nft_id: string;
  raffle_at: string;
  endDate: string;
  entry_count: number;
  conditions: RaffleCondition[];
  publicResults: boolean;
  website: string;
  prize_name: string;
  project_description?: string;
  signature?: string;
}

export interface Participant {
  id: string;
  address: string;
  entry: number;
  entered_at: string;
  user?: {
    name: string;
    profile_image: string;
  };
}

export interface Activity extends Participant {}

export interface Winner {
  address: string;
  entry: number;
  winning_entry: number;
  won_at: string;
  user?: {
    name: string;
    profile_image: string;
  };
}

export interface RaffleInput {
  displayName: string;
  conditions: RaffleCondition[];
  publicResults: boolean;
  website: string;
  prizeCount: number;
  prizeName: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}