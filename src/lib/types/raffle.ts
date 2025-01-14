export interface RaffleCondition {
  entry: number;    // Number of entries this condition grants
  points: number;   // Points required for this condition
}

export interface Raffle {
  id: string;
  title: string;
  description: string;
  prizeValue: string;
  endDate: string;
  participantCount: number;
  imageUrl: string;
  conditions: RaffleCondition[];
  onlyAllowOnce: boolean;
  status: 'active' | 'completed' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface CompletedRaffle extends Raffle {
  winner: string;          // Winner's wallet address
  ended_at: string;        // When the raffle ended
  project_key: string;     // RandomPicker project key for verification
  winningEntry: number;    // The winning entry number
  totalEntries: number;    // Total number of entries in the raffle
}

export interface RaffleParticipant {
  address: string;         // Participant's wallet address
  points: number;         // Points used for entry
  entries: number;        // Number of entries received
  joinedAt: string;       // When they joined the raffle
  transactionHash?: string; // Optional: Transaction hash for verification
}

export interface IRaffleDetails extends Raffle {
  participants: RaffleParticipant[];
  totalEntries: number;
  myEntries?: number;     // Current user's entries (if participated)
  isParticipating?: boolean; // Whether current user is participating
}

export interface CreateRaffleInput {
  title: string;
  description: string;
  prizeValue: string;
  endDate: string;
  image: File;
  conditions: RaffleCondition[];
  onlyAllowOnce: boolean;
}

export interface UpdateRaffleInput {
  id: string;
  title?: string;
  description?: string;
  prizeValue?: string;
  endDate?: string;
  image?: File;
  conditions?: RaffleCondition[];
  onlyAllowOnce?: boolean;
}

export interface RaffleResponse {
  success: boolean;
  message: string;
  data?: Raffle | CompletedRaffle;
  error?: string;
}

export interface RaffleStats {
  totalParticipants: number;
  totalEntries: number;
  uniqueWinners: number;
  averageEntries: number;
  topParticipants: {
    address: string;
    entries: number;
  }[];
}

export type RaffleStatus = 'active' | 'completed' | 'draft';

export interface RaffleFilters {
  status?: RaffleStatus;
  startDate?: string;
  endDate?: string;
  minPrizeValue?: number;
  maxPrizeValue?: number;
  participantCount?: number;
}

export interface RafflePagination {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface RaffleFormData {
  title: string;
  description: string;
  prizeValue: string;
  endDate: string;
  conditions: RaffleCondition[];
  onlyAllowOnce: boolean;
}

export type ButtonType = 'button' | 'submit' | 'reset';