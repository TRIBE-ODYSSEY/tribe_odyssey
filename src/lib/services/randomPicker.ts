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

class RandomPickerService {
  private token: string | null = null;
  private config: RandomPickerConfig;

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

      this.token = response.data.LoginInsertResult.ID;
      return this.token;
    } catch (error) {
      console.error('RandomPicker login failed:', error);
      throw new Error('Failed to login to RandomPicker');
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
}

// Create and export a singleton instance
export const randomPicker = new RandomPickerService({
  username: import.meta.env.VITE_RANDOMPICKER_USERNAME || '',
  password: import.meta.env.VITE_RANDOMPICKER_PASSWORD || '',
  baseUrl: 'https://app.randompicker.com/Webservice'
});

export default RandomPickerService;