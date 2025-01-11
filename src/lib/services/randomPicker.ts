import axios from 'axios';

interface RandomPickerConfig {
  username: string;
  password: string;
  baseUrl: string;
}

interface Prize {
  Count: number;
  PrizeName: string;
}

interface Participant {
  PublicInfo: string;
  PrivateInfo: string;
  Weight: number;
}

interface Raffle {
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

interface RaffleDetails extends Raffle {
  participants: {
    address: string;
    points: number;
    joinedAt: Date;
  }[];
}

interface CompletedRaffle {
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

interface EnterRaffleParams {
  address: string;
  points: number;
  conditions: {
    entry: number;
    points: number;
  }[];
}

interface CreateRaffleParams {
  title: string;
  description: string;
  prizeValue: string;
  endDate: string;
  conditions: {
    entry: number;
    points: number;
  }[];
  onlyAllowOnce: boolean;
  image: File;
  signature: string;
  address: string;
}

class RandomPickerService {
  private token: string | null = null;
  private config: RandomPickerConfig;
  private nonces: Map<string, string> = new Map();

  constructor(config: RandomPickerConfig) {
    this.config = config;
  }

  async login(): Promise<string> {
    try {
      const response = await axios.post(`${this.config.baseUrl}/User.asmx/LoginInsert`, {
        loginInsertInput: {
          UserName: this.config.username,
          Password: this.config.password,
        }
      });
      if (!response.data?.LoginInsertResult?.ID) {
        throw new Error('Invalid login response from RandomPicker');
      }
      const token = response.data.LoginInsertResult.ID;
      if (typeof token !== 'string') {
        throw new Error('Invalid token type received from RandomPicker');
      }
      this.token = token;
      return token;
    } catch (error) {
      console.error('RandomPicker login failed:', error);
      throw new Error('Failed to login to RandomPicker');
    }
  }

  async getNonce(address: string): Promise<{ data: { nonce: string } }> {
    const nonce = Math.random().toString(36).substring(7);
    this.nonces.set(address, nonce);
    return { data: { nonce } };
  }

  async createRaffle(params: CreateRaffleParams): Promise<void> {
    if (!this.token) await this.login();

    const storedNonce = this.nonces.get(params.address);
    if (!storedNonce) {
      throw new Error('No nonce found for this address');
    }

    try {
      const formData = new FormData();
      formData.append('image', params.image);

      // Upload image first
      const imageUploadResponse = await axios.post(`${this.config.baseUrl}/upload`, formData);
      const imageUrl = imageUploadResponse.data.url;

      const projectResponse = await this.createProject({
        displayName: params.title,
        conditions: params.description,
        prizes: [{
          Count: 1,
          PrizeName: params.prizeValue
        }]
      });

      // Additional raffle setup logic here
      // You may need to add more API calls based on your requirements

      this.nonces.delete(params.address);
    } catch (error) {
      console.error('Failed to create raffle:', error);
      throw new Error('Failed to create raffle');
    }
  }

  async createProject(params: {
    displayName: string;
    conditions: string;
    prizes: Prize[];
  }): Promise<string> {
    if (!this.token) await this.login();

    try {
      const response = await axios.post(`${this.config.baseUrl}/Project.asmx/ProjectInsert`, {
        projectInsertInput: {
          ID_Login: this.token,
          DisplayName: params.displayName,
          ID_Method: 'guid',
          Conditions: params.conditions,
          PublicResults: true,
          WWW: '',
          ID_ProjectType: 'PrizeWinner',
          ID_DrawType: 'Nonprofit',
          Prizes: params.prizes
        }
      });

      return response.data.ProjectInsertResult.ID;
    } catch (error) {
      console.error('Failed to create RandomPicker project:', error);
      throw new Error('Failed to create raffle project');
    }
  }

  async addParticipant(projectId: string, participant: {
    publicInfo: string;
    privateInfo: string;
    weight: number;
  }): Promise<void> {
    if (!this.token) await this.login();

    try {
      await axios.post(`${this.config.baseUrl}/Project.asmx/ParticipantInsertProject`, {
        participantInsertProjectInput: {
          ID_Login: this.token,
          ID_Project: projectId,
          PublicInfo: participant.publicInfo,
          PrivateInfo: participant.privateInfo,
          Weight: participant.weight
        }
      });
    } catch (error) {
      console.error('Failed to add participant:', error);
      throw new Error('Failed to add participant to raffle');
    }
  }

  async addMultipleParticipants(projectId: string, participants: Participant[]): Promise<void> {
    if (!this.token) await this.login();

    try {
      await axios.post(`${this.config.baseUrl}/Project.asmx/ParticipantInsertBatch`, {
        participantInsertBatchInput: {
          ID_Login: this.token,
          ID_Project: projectId,
          Participants: participants
        }
      });
    } catch (error) {
      console.error('Failed to add participants batch:', error);
      throw new Error('Failed to add participants to raffle');
    }
  }

  async drawWinner(projectId: string): Promise<void> {
    if (!this.token) await this.login();

    try {
      await axios.post(`${this.config.baseUrl}/Project.asmx/ProjectUpdateDraw`, {
        projectUpdateDrawInput: {
          ID_Login: this.token,
          ID: projectId,
          Final: true
        }
      });
    } catch (error) {
      console.error('Failed to draw winner:', error);
      throw new Error('Failed to draw raffle winner');
    }
  }

  async getWinnersWithRetry(maxRetries = 3): Promise<any[]> {
    if (!this.token) await this.login();
    
    let retries = 0;
    while (retries < maxRetries) {
      try {
        const response = await axios.post(`${this.config.baseUrl}/Project.asmx/ProjectSelectList`, {
          projectSelectListInput: {
            ID_Login: this.token,
            Status: 'Complete'
          }
        });
        return response.data.ProjectSelectListResult || [];
      } catch (error) {
        retries++;
        if (retries === maxRetries) {
          console.error('Failed to fetch winners after max retries:', error);
          throw new Error('Failed to fetch winners');
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * retries));
      }
    }
    return [];
  }

  async getActiveRaffles(): Promise<Raffle[]> {
    if (!this.token) await this.login();
    
    try {
      const response = await axios.post(`${this.config.baseUrl}/Project.asmx/ProjectSelectList`, {
        projectSelectListInput: {
          ID_Login: this.token,
          Status: 'Active'
        }
      });

      return response.data.ProjectSelectListResult.map((project: any) => ({
        id: project.ID,
        title: project.DisplayName,
        description: project.Conditions || '',
        endDate: new Date(project.DrawDate),
        prizeImage: project.ImageURL || '/images/placeholder.png',
        prizeValue: project.Prizes[0]?.PrizeName || 'N/A',
        project_key: project.ID_Method,
        nft_id: project.ID_NFT || '',
        conditions: project.EntryPoints || [],
        only_allow_once: project.OnlyAllowOnce || false,
        participantCount: project.ParticipantCount || 0,
        status: 'active'
      }));
    } catch (error) {
      console.error('Failed to fetch active raffles:', error);
      throw error;
    }
  }

  async getRaffleDetails(raffleId: string): Promise<RaffleDetails | null> {
    if (!this.token) await this.login();

    try {
      const response = await axios.post(`${this.config.baseUrl}/Project.asmx/ProjectSelect`, {
        projectSelectInput: {
          ID_Login: this.token,
          ID: raffleId
        }
      });

      const project = response.data.ProjectSelectResult;
      if (!project) return null;

      return {
        id: project.ID,
        title: project.DisplayName,
        description: project.Conditions || '',
        endDate: new Date(project.DrawDate),
        prizeImage: project.ImageURL || '/images/placeholder.png',
        prizeValue: project.Prizes[0]?.PrizeName || 'N/A',
        project_key: project.ID_Method,
        nft_id: project.ID_NFT || '',
        conditions: project.EntryPoints || [],
        only_allow_once: project.OnlyAllowOnce || false,
        participantCount: project.ParticipantCount || 0,
        status: project.Status.toLowerCase(),
        participants: project.Participants.map((p: any) => ({
          address: p.PublicInfo,
          points: p.Weight,
          joinedAt: new Date(p.CreatedAt)
        }))
      };
    } catch (error) {
      console.error('Failed to fetch raffle details:', error);
      throw error;
    }
  }

  async enterRaffle(raffleId: string, params: EnterRaffleParams): Promise<void> {
    if (!this.token) await this.login();

    try {
      await this.addParticipant(raffleId, {
        publicInfo: params.address,
        privateInfo: '',
        weight: params.points
      });
    } catch (error) {
      console.error('Failed to enter raffle:', error);
      throw new Error('Failed to enter raffle');
    }
  }

  async getCompletedRaffles(): Promise<CompletedRaffle[]> {
    if (!this.token) await this.login();
    
    try {
      const response = await axios.post(`${this.config.baseUrl}/Project.asmx/ProjectSelectList`, {
        projectSelectListInput: {
          ID_Login: this.token,
          Status: 'Complete'
        }
      });

      return response.data.ProjectSelectListResult.map((project: any) => ({
        id: project.ID,
        title: project.DisplayName,
        description: project.Conditions || '',
        endDate: new Date(project.DrawDate),
        ended_at: project.DrawDate,
        prizeImage: project.ImageURL || '/images/placeholder.png',
        winner: project.Winner?.PublicInfo || '',
        prizeValue: project.Prizes[0]?.PrizeName || 'N/A',
        participantCount: project.ParticipantCount || 0,
        project_key: project.ID_Method
      }));
    } catch (error) {
      console.error('Failed to fetch completed raffles:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
export const randomPicker = new RandomPickerService({
  username: import.meta.env.VITE_RANDOMPICKER_USERNAME || '',
  password: import.meta.env.VITE_RANDOMPICKER_PASSWORD || '',
  baseUrl: 'https://app.randompicker.com/Webservice'
});

export default RandomPickerService;