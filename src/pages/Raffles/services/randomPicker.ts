import axios from 'axios';

const API_BASE_URL = 'https://app.randompicker.com/Webservice';
const USERNAME = import.meta.env.VITE_RANDOM_PICKER_USERNAME;
const PASSWORD = import.meta.env.VITE_RANDOM_PICKER_PASSWORD;

export interface RaffleCreateParams {
  title: string;
  description: string;
  prizeValue: string;
  endDate: string;
  image: File;
  conditions: Array<{
    entry: number;
    points: number;
  }>;
  onlyAllowOnce: boolean;
}

export interface RandomPickerResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface RandomPickerError {
  success: false;
  message: string;
  code: string;
}

class RandomPickerService {
  private readonly userEndpoint = `${API_BASE_URL}/User.asmx`;
  private readonly projectEndpoint = `${API_BASE_URL}/Project.asmx`;
  private token: string | null = null;

  private async authenticate() {
    if (!USERNAME || !PASSWORD) {
      throw new Error('RandomPicker credentials not configured');
    }

    try {
      const response = await axios.post(`${this.userEndpoint}/LoginInsert`, {
        UserName: USERNAME,
        Password: PASSWORD
      }, {
        headers: {
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://randompicker.com/LoginInsert'
        }
      });

      // Parse SOAP response to get token
      const tokenMatch = response.data.match(/<ID>(.+?)<\/ID>/);
      if (tokenMatch && tokenMatch[1]) {
        this.token = tokenMatch[1];
        return this.token;
      }
      throw new Error('Failed to extract authentication token');
    } catch (error) {
      console.error('Authentication failed:', error);
      throw new Error('Failed to authenticate with RandomPicker');
    }
  }

  private async getAuthToken() {
    if (!this.token) {
      await this.authenticate();
    }
    return this.token;
  }

  private async makeAuthenticatedRequest<T>(
    endpoint: string, 
    method: 'GET' | 'POST', 
    data?: any
  ): Promise<RandomPickerResponse<T>> {
    try {
      const token = await this.getAuthToken();
      const response = await axios({
        method,
        url: endpoint,
        data,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json'
        }
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.token = null; // Reset token
        return this.makeAuthenticatedRequest(endpoint, method, data);
      }
      throw error;
    }
  }

  async getNonce(address: string) {
    return this.makeAuthenticatedRequest(`${this.userEndpoint}/GetNonce`, 'POST', {
      address
    });
  }

  async createRaffle(params: RaffleCreateParams, signature: string) {
    const formData = new FormData();
    formData.append('title', params.title);
    formData.append('description', params.description);
    formData.append('prizeValue', params.prizeValue);
    formData.append('endDate', params.endDate);
    formData.append('image', params.image);
    formData.append('conditions', JSON.stringify(params.conditions));
    formData.append('onlyAllowOnce', String(params.onlyAllowOnce));
    formData.append('signature', signature);

    return this.makeAuthenticatedRequest(
      `${this.projectEndpoint}/CreateRaffle`,
      'POST',
      formData
    );
  }

  async getActiveRaffles() {
    return this.makeAuthenticatedRequest(
      `${this.projectEndpoint}/GetActiveRaffles`,
      'GET'
    );
  }

  async getCompletedRaffles() {
    return this.makeAuthenticatedRequest(
      `${this.projectEndpoint}/GetCompletedRaffles`,
      'GET'
    );
  }

  async enterRaffle(raffleId: string, points: number, signature: string) {
    return this.makeAuthenticatedRequest(
      `${this.projectEndpoint}/EnterRaffle`,
      'POST',
      {
        raffleId,
        points,
        signature
      }
    );
  }
}

export const randomPicker = new RandomPickerService();