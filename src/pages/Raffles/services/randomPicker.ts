import axios from 'axios';
import { 
  RaffleDetails, 
  Participant, 
  Activity, 
  Winner, 
  ApiResponse,
  RaffleInput
} from '../types/Raffle.types';

interface RandomPickerConfig {
  readonly username: string;
  readonly password: string;
  readonly baseUrl: string;
  readonly UserWsdl: string;
  readonly ProjectWsdl: string;
}

interface RandomPickerService {
  getProjectDetails(id: string): Promise<ApiResponse<RaffleDetails[]>>;
  getParticipants(id: string): Promise<ApiResponse<Participant[]>>;
  getActivities(id: string): Promise<ApiResponse<Activity[]>>;
  getWinner(id: string): Promise<ApiResponse<Winner>>;
  getNonce(address: string): Promise<string>;
  enterRaffleProject(id: string, data: { address: string; points: number; signature: string; }): Promise<ApiResponse<any>>;
  deleteProject(id: string): Promise<ApiResponse<any>>;
  updateProject(id: string, data: RaffleInput): Promise<ApiResponse<any>>;
  createProject(data: RaffleInput): Promise<ApiResponse<any>>;
  getProjects(): Promise<ApiResponse<RaffleDetails[]>>;
  getProject(id: string): Promise<ApiResponse<RaffleDetails>>;
  getProjectByProjectKey(projectKey: string): Promise<ApiResponse<RaffleDetails>>;
}

class RandomPickerServiceImpl implements RandomPickerService {
  private token: string | null = null;
  private readonly api = axios.create({
    baseURL: process.env.VITE_API_URL || 'https://app.randompicker.com/Webservice'
  });
  
  private readonly config: RandomPickerConfig = {
    username: process.env.VITE_RANDOM_PICKER_USERNAME ?? '',
    password: process.env.VITE_RANDOM_PICKER_PASSWORD ?? '',
    baseUrl: 'https://app.randompicker.com/Webservice',
    UserWsdl: 'https://app.randompicker.com/Webservice/User.asmx?wsdl',
    ProjectWsdl: 'https://app.randompicker.com/Webservice/Project.asmx?wsdl'
  };

  // Authentication Methods
  private async authenticate(): Promise<string> {
    const soapEnvelope = `
      <?xml version="1.0" encoding="utf-8"?>
      <soap12:Envelope 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
        xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
        <soap12:Body>
          <LoginDetail xmlns="http://www.randompicker.com/">
            <loginInsertInput>
              <UserName>${this.config.username}</UserName>
              <Password>${this.config.password}</Password>
            </loginInsertInput>
          </LoginDetail>
        </soap12:Body>
      </soap12:Envelope>
    `;

    try {
      const response = await this.api.post(
        this.config.UserWsdl,
        soapEnvelope,
        {
          headers: {
            'Content-Type': 'application/soap+xml; charset=utf-8',
            'SOAPAction': 'http://www.randompicker.com/LoginDetail'
          }
        }
      );

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");
      const loginDetailResult = xmlDoc.getElementsByTagName("LoginDetailResult")[0];
      this.token = loginDetailResult?.getElementsByTagName("ID")[0]?.textContent ?? null;
      
      if (!this.token) {
        throw new Error('Authentication failed: No token received');
      }
      
      return this.token;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw new Error('Failed to authenticate with RandomPicker');
    }
  }

  private async getToken(): Promise<string> {
    if (!this.token) {
      await this.authenticate();
    }
    return this.token ?? '';
  }

  // API Methods
  async getProjectDetails(id: string): Promise<ApiResponse<RaffleDetails[]>> {
    try {
      const token = await this.getToken();
      const response = await this.api.get(`/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { success: true, data: [response.data] };
    } catch (error) {
      return { success: false, data: [], error: 'Failed to fetch project details' };
    }
  }

  async getParticipants(id: string): Promise<ApiResponse<Participant[]>> {
    try {
      const token = await this.getToken();
      const response = await this.api.get(`/projects/${id}/participants`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, data: [], error: 'Failed to fetch participants' };
    }
  }

  async getActivities(id: string): Promise<ApiResponse<Activity[]>> {
    try {
      const token = await this.getToken();
      const response = await this.api.get(`/projects/${id}/activities`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, data: [], error: 'Failed to fetch activities' };
    }
  }

  async getWinner(id: string): Promise<ApiResponse<Winner>> {
    try {
      const token = await this.getToken();
      const response = await this.api.get(`/projects/${id}/winner`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, data: {} as Winner, error: 'Failed to fetch winner' };
    }
  }

  async getNonce(address: string): Promise<string> {
    try {
      const token = await this.getToken();
      const response = await this.api.get(`/nonce/${address}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.nonce;
    } catch (error) {
      throw new Error('Failed to get nonce');
    }
  }

  async enterRaffleProject(
    id: string, 
    data: { address: string; points: number; signature: string; }
  ): Promise<ApiResponse<any>> {
    try {
      const token = await this.getToken();
      const response = await this.api.post(`/projects/${id}/enter`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, data: null, error: 'Failed to enter raffle' };
    }
  }

  async deleteProject(id: string): Promise<ApiResponse<any>> {
    try {
      const token = await this.getToken();
      const response = await this.api.delete(`/projects/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, data: null, error: 'Failed to delete project' };
    }
  }

  async updateProject(id: string, data: RaffleInput): Promise<ApiResponse<any>> {
    try {
      const token = await this.getToken();
      const response = await this.api.put(`/projects/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, data: null, error: 'Failed to update project' };
    }
  }

  async createProject(data: RaffleInput): Promise<ApiResponse<any>> {
    try {
      const token = await this.getToken();
      const response = await this.api.post('/projects', data, { headers: { Authorization: `Bearer ${token}` } });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, data: null, error: 'Failed to create project' };
    }
  }

  async getProjects(): Promise<ApiResponse<RaffleDetails[]>> {
    try {
      const token = await this.getToken();
      const response = await this.api.get('/projects', { headers: { Authorization: `Bearer ${token}` } });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, data: [], error: 'Failed to fetch projects' };
    }
  }

  async getProject(id: string): Promise<ApiResponse<RaffleDetails>> {
    try {
      const token = await this.getToken();
      const response = await this.api.get(`/projects/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, data: {} as RaffleDetails, error: 'Failed to fetch project' };
    }
  }

  async getProjectByProjectKey(projectKey: string): Promise<ApiResponse<RaffleDetails>> {
    try {
      const token = await this.getToken();
      const response = await this.api.get(`/projects/projectKey/${projectKey}`, { headers: { Authorization: `Bearer ${token}` } });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, data: {} as RaffleDetails, error: 'Failed to fetch project' };
    }
  }
}


export const randomPicker = new RandomPickerServiceImpl();