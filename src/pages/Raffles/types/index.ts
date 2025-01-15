// Basic Types
export interface RaffleCondition {
  entry: number;
  points: number;
}

// Core Types
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
  winner?: {
    address: string;
    entry: number;
    winning_entry: number;
    won_at: string;
    user?: {
      name: string;
      profile_image: string;
    };
  };
  project_description: string;
  prize_name: string;
  only_allow_once: boolean;
  only_allow_once_count: number;
  only_allow_once_count_type: string;
  points: number;
  entry: number;
  error?: string;
  nonce?: string;
  signature?: string;
  participants?: Participant[];
  activities?: Activity[];
  loading?: boolean;
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

export interface Activity extends Participant {
  // Additional activity-specific fields if needed
}

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

// Input Types
export interface RaffleInput {
  displayName: string;
  conditions: RaffleCondition[];
  publicResults: boolean;
  website: string;
  prizeCount: number;
  prizeName: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// Service Types
export interface RandomPickerService {
  getProjectDetails: (id: string) => Promise<ApiResponse<IRaffleDetails[]>>;
  getParticipants: (id: string) => Promise<ApiResponse<Participant[]>>;
  getActivities: (id: string) => Promise<ApiResponse<Activity[]>>;
  getWinner: (id: string) => Promise<ApiResponse<Winner>>;
  getNonce: (address: string) => Promise<string>;
  enterRaffleProject: (
    id: string, 
    data: { 
      address: string; 
      points: number; 
      signature: string; 
    }
  ) => Promise<ApiResponse<any>>;
}

// Component Props Types
export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export interface CompletedRaffle extends IRaffleDetails {
  winner: {
    address: string;
    entry: number;
    winning_entry: number;
    won_at: string;
    user?: {
      name: string;
      profile_image: string;
    };
  };
}

export interface Raffle extends IRaffleDetails {
  winner: {
    address: string;
    entry: number;
    winning_entry: number;
    won_at: string;
    user?: {
      name: string;
      profile_image: string;
    };
  };
}

export interface RaffleWithWinner extends IRaffleDetails {
  winner: {
    address: string;
    entry: number;
    winning_entry: number;
    won_at: string;
    user?: {
      name: string;
      profile_image: string;
    };
  };
}

export interface RaffleWithParticipants extends IRaffleDetails {
  participants: Participant[];
}

export interface RaffleWithActivities extends IRaffleDetails {
  activities: Activity[];
}