import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://app.randompicker.com/Webservice/User.asmx?wsdl';
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
      const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                      xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <LoginInsert xmlns="http://app.randompicker.com/">
              <UserName>${USERNAME}</UserName>
              <Password>${PASSWORD}</Password>
            </LoginInsert>
          </soap:Body>
        </soap:Envelope>`;

      const response = await axios.post(this.userEndpoint, soapEnvelope, {
        headers: {
          'Content-Type': 'text/xml;charset=UTF-8',
          'SOAPAction': 'http://app.randompicker.com/LoginInsert'
        },
        withCredentials: true // Include cookies if needed
      });

      const tokenMatch = response.data.match(/<ID>(.+?)<\/ID>/);
      if (tokenMatch && tokenMatch[1]) {
        this.token = tokenMatch[1];
        return this.token;
      }
      throw new Error('Failed to extract authentication token');
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error;
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
      
      const soapEnvelope = method === 'POST' ? this.createSoapEnvelope(endpoint, data) : null;

      const response = await axios({
        method,
        url: endpoint,
        data: soapEnvelope,
        headers: {
          'Content-Type': 'text/xml;charset=UTF-8',
          'SOAPAction': `http://app.randompicker.com/${endpoint.split('/').pop()}`,
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });

      return this.parseSoapResponse(response.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.token = null;
        return this.makeAuthenticatedRequest(endpoint, method, data);
      }
      throw error;
    }
  }

  private createSoapEnvelope(endpoint: string, data: any): string {
    const operation = endpoint.split('/').pop();
    return `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <${operation} xmlns="http://app.randompicker.com/">
            ${this.objectToXml(data)}
          </${operation}>
        </soap:Body>
      </soap:Envelope>`;
  }

  private objectToXml(obj: any): string {
    return Object.entries(obj)
      .map(([key, value]) => `<${key}>${value}</${key}>`)
      .join('');
  }

  private parseSoapResponse(soapResponse: string): RandomPickerResponse<any> {
    // Add proper SOAP response parsing
    // This will need to be customized based on the actual response format
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(soapResponse, "text/xml");
      // Extract relevant data from XML response
      // This is a simplified example
      return {
        success: true,
        data: xmlDoc
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Failed to parse SOAP response'
      };
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