// Point System Types
export interface PointTransaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  timestamp: number;
  signature: string;
  nonce: string;
  type: 'credit' | 'transfer' | 'raffle_entry';
  status: 'completed' | 'pending' | 'failed';
  adminAddress?: string;
  transaction_hash?: string;
}

export interface PointBalance {
  address: string;
  balance: number;
  lastUpdated: number;
  transactions?: PointTransaction[];
}

// User Types
export interface UserProfile {
  address: string;
  name?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
  total_points: number;
  total_entries: number;
  total_wins: number;
}

// Raffle Basic Types
export interface RaffleCondition {
  entry: number;
  points: number;
  maxEntries?: number;
  minPoints?: number;
}

export interface RaffleDetails {
  id: string;
  project_name: string;
  project_status: 'active' | 'completed' | 'cancelled';
  prize_image: string;
  nft_id: string;
  raffle_at: string;
  endDate: string;
  entry_count: number;
  total_points: number;
  conditions: RaffleCondition[];
  publicResults: boolean;
  website: string;
  prize_name: string;
  project_description?: string;
  signature?: string;
  created_at: string;
  updated_at: string;
  min_points: number;
  max_entries_per_user: number;
  admin_address: string;
  winner_address?: string;
  winner?: Winner;
  nonce?: string;
}

export interface Participant {
  id: string;
  address: string;
  entry: number;
  points_spent: number;
  entered_at: string;
  signature: string;
  raffle_id: string;
  user?: UserProfile;
}

export interface Activity extends Participant {
  action: 'enter' | 'win' | 'refund';
  timestamp: string;
  details?: Record<string, any>;
}

export interface Winner {
  address: string;
  entry: number;
  winning_entry: number;
  won_at: string;
  raffle_id: string;
  prize_claimed: boolean;
  prize_claimed_at?: string;
  transaction_hash?: string;
  verification_hash?: string;
  user?: UserProfile;
}

// Input Types
export interface RaffleInput {
  project_name: string;
  prize_name: string;
  prize_image: string;
  nft_id: string;
  raffle_at: string;
  endDate: string;
  conditions: RaffleCondition[];
  publicResults: boolean;
  website: string;
  project_description?: string;
  min_points?: number;
  max_entries_per_user?: number;
  signature: string;
  nonce: string;
  adminAddress: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
  timestamp: number;
  nonce?: string;
}

// Proof and Verification Types
export interface RaffleProof {
  seed: string;
  blockNumber: number;
  blockHash: string;
  timestamp: number;
  totalEntries: number;
  totalPoints: number;
  raffleId: string;
  winnerAddress: string;
  signature: string;
  nonce?: string;
}

export interface RaffleResult {
  winner: Winner;
  proof: RaffleProof;
  drawnAt: string;
  verificationHash: string;
  transaction_hash?: string;
}

// Admin Action Types
export interface AdminAction {
  id: string;
  action: 'credit' | 'transfer' | 'draw' | 'cancel' | 'create' | 'update';
  adminAddress: string;
  timestamp: number;
  signature: string;
  nonce: string;
  params: Record<string, any>;
  status: 'completed' | 'pending' | 'failed';
  error?: string;
  transaction_hash?: string;
}

// Signature Types
export interface SignatureRequest {
  action: string;
  params: Record<string, any>;
  nonce: string;
  timestamp: number;
  adminAddress?: string;
}

export interface SignatureResponse {
  signature: string;
  address: string;
  nonce: string;
  timestamp: number;
  expiry?: number;
}

// Service Options Types
export interface ServiceOptions {
  signature?: string;
  nonce?: string;
  adminAddress?: string;
}

// Pagination Types
export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ImageUploadResponse {
  imageUrl: string;
  handleImageUpload: (image: File) => Promise<string>;
}
