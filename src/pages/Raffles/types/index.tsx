export interface RaffleCondition {
    entry: number;    // Number of entries this condition grants
    points: number;   // Points required for this condition
  }
  
  export interface Raffle {
    // Basic raffle information
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

    // Project-specific details
    projectId: string;
    projectKey: string;
    projectName: string;
    projectStatus: string;
    projectType: string;
    projectDrawType: string;
    projectPrizes: string;
    projectConditions: string;
    projectPublicResults: boolean;
    projectWebsite: string;
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
    signature?: string;
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
    error?: string;
    data: Raffle[] | CompletedRaffle[] | undefined;
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
    signature?: string;
  }
  
  export interface RaffleInput {
    displayName: string;
    conditions: string;
    publicResults: boolean;
    website: string;
    prizeCount: number;
    prizeName: string;
    signature?: string;
  }
  
  export interface ParticipantInput {
    publicInfo: string;
    privateInfo: string;
    weight: number;
  }
  
  export interface RaffleResult {
    id: string;
    winner: string;
    drawnAt: Date;
  }

  export interface RaffleProject {
    id: string;
    name: string;
    status: string;
    type: string;
    drawType: string;
    prizes: string;
    conditions: string;
    publicResults: boolean;
    website: string;
  }
  
  export interface RaffleProjectList {
    projects: RaffleProject[];
    total: number;
  }

  export interface RaffleAdmin {
    projects: RaffleProject[];
    participants: RaffleParticipant[];
    results: RaffleResult[];
    types: string[];
    drawTypes: string[];
    prizes: string[];
    conditions: string[];
    publicResults: boolean[];
    website: string[];
    total: number;
  }
  
  export interface RaffleProjectDetails {
    project: RaffleProject;
    participants: RaffleParticipant[];
    totalEntries: number;
  }
  
  export interface RaffleProjectUpdate {
    id: string;
    name: string;
    status: string;
    type: string;
    drawType: string;
    prizes: string;
    conditions: string;
    publicResults: boolean;
    website: string;
  }

  export interface RaffleProjectDelete {
    id: string;
  }

  export interface RaffleProjectCreate {
    displayName: string;
    conditions: string;
    publicResults: boolean;
    website: string;
    prizeCount: number;
    prizeName: string;
  }

  export interface RaffleProjectResult {
    id: string;
    winner: string;
    drawnAt: Date;
  }

  export interface RaffleProjectResultList {
    results: RaffleProjectResult[];
    total: number;
  }

  export interface RaffleProjectParticipant {
    id: string;
    publicInfo: string;
    privateInfo: string;
    weight: number;
  }

  export interface RaffleProjectParticipantList {
    participants: RaffleProjectParticipant[];
    total: number;
  }

  export interface RaffleProjectParticipantUpdate {
    id: string;
    publicInfo: string;
    privateInfo: string;
    weight: number;
  }

  export interface RaffleProjectParticipantDelete {
    id: string;
  }

  export interface RaffleProjectParticipantCreate {
    publicInfo: string;
    privateInfo: string;
    weight: number;
  }

  export interface RaffleProjectResponse {
    success: boolean;
    message: string;
    data?: RaffleProject | RaffleProjectList | RaffleProjectDetails | RaffleProjectUpdate | RaffleProjectDelete | RaffleProjectCreate | RaffleProjectResult | RaffleProjectResultList | RaffleProjectParticipant | RaffleProjectParticipantList | RaffleProjectParticipantUpdate | RaffleProjectParticipantDelete | RaffleProjectParticipantCreate;
    error?: string;
  }

  interface ButtonProps {
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
  }
  
  export const Button: React.FC<ButtonProps> = ({ children, type = 'button', ...props }) => {
    return (
      <button type={type} {...props}>
        {children}
      </button>
    );
  }; 
  export type ButtonType = 'button' | 'submit' | 'reset';