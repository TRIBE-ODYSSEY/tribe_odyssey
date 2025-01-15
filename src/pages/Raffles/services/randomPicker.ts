import axios from 'axios';
import { 
  CompletedRaffle, 
  RaffleInput, 
  ParticipantInput,
  RaffleProject,
  RaffleProjectCreate 
} from '../types';

interface RandomPickerConfig {
  username: string;
  password: string;
  baseUrl: string;
  wsdl: string;
}

class RandomPickerService {
  private token: string | null = null;
  private readonly config: RandomPickerConfig = {
    username: process.env.VITE_RANDOM_PICKER_USERNAME || '',
    password: process.env.VITE_RANDOM_PICKER_PASSWORD || '',
    baseUrl: 'https://app.randompicker.com/Webservice',
    wsdl: 'https://app.randompicker.com/Webservice/User.asmx?wsdl'
  };

  private async authenticate() {
    const soapEnvelope = `
      <?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <LoginInsert xmlns="http://app.randompicker.com/">
            <UserName>${this.config.username}</UserName>
            <Password>${this.config.password}</Password>
          </LoginInsert>
        </soap:Body>
      </soap:Envelope>
    `;

    try {
      const response = await axios.post(
        `${this.config.baseUrl}/User.asmx`,
        soapEnvelope,
        {
          headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            'SOAPAction': 'http://app.randompicker.com/LoginInsert'
          }
        }
      );

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");
      this.token = xmlDoc.getElementsByTagName("ID")[0]?.textContent || null;
      return this.token;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw new Error('Failed to authenticate with RandomPicker');
    }
  }

  async createRaffle(raffleData: RaffleProjectCreate) {
    const token = await this.getToken();
    try {
      const response = await axios.post(
        this.config.wsdl,
        {
          ProjectInsert: {
            ID_Login: token,
            DisplayName: raffleData.displayName,
            ID_Method: 'guid',
            Conditions: raffleData.conditions,
            PublicResults: true,
            WWW: '',
            ID_ProjectType: 'PrizeWinner',
            ID_DrawType: 'Nonprofit',
            Prizes: {
              Prize: {
                Count: 1,
                PrizeName: raffleData.prizeName
              }
            }
          }
        },
        {
          headers: {
            'Content-Type': 'application/soap+xml;charset=UTF-8'
          }
        }
      );

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");
      return xmlDoc.getElementsByTagName("ID")[0]?.textContent || null;
    } catch (error) {
      console.error('Failed to create raffle:', error);
      throw new Error('Failed to create raffle');
    }
  }

  async addParticipant(projectId: string, participant: ParticipantInput) {
    const token = await this.getToken();
    try {
      await axios.post(
        this.config.wsdl,
        {
          ParticipantInsertProject: {
            ID_Login: token,
            ID_Project: projectId,
            PublicInfo: participant.publicInfo,
            PrivateInfo: participant.privateInfo,
            Weight: participant.weight
          }
        },
        {
          headers: {
            'Content-Type': 'application/soap+xml;charset=UTF-8'
          }
        }
      );
    } catch (error) {
      console.error('Failed to add participant:', error);
      throw new Error('Failed to add participant');
    }
  }

  async drawWinner(projectId: string) {
    const token = await this.getToken();
    try {
      const response = await axios.post(
        this.config.wsdl,
        {
          ProjectUpdateDraw: {
            ID_Login: token,
            ID: projectId,
            Final: true
          }
        },
        {
          headers: {
            'Content-Type': 'application/soap+xml;charset=UTF-8'
          }
        }
      );

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");
      return xmlDoc.getElementsByTagName("Winner")[0]?.textContent || null;
    } catch (error) {
      console.error('Failed to draw winner:', error);
      throw new Error('Failed to draw winner');
    }
  }

  async getCompletedRaffles(): Promise<CompletedRaffle[]> {
    const token = await this.getToken();
    const soapEnvelope = `
      <?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <ProjectList xmlns="http://app.randompicker.com/">
            <ID_Login>${token}</ID_Login>
            <Status>Completed</Status>
          </ProjectList>
        </soap:Body>
      </soap:Envelope>
    `;

    try {
      const response = await axios.post(
        `${this.config.baseUrl}/Project.asmx`,
        soapEnvelope,
        {
          headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            'SOAPAction': 'http://app.randompicker.com/ProjectList'
          }
        }
      );

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");
      const projects = xmlDoc.getElementsByTagName("Project");

      return Array.from(projects).map(project => this.parseProjectToRaffle(project));
    } catch (error) {
      console.error('Failed to fetch completed raffles:', error);
      throw new Error('Failed to fetch completed raffles');
    }
  }

  private parseProjectToRaffle(project: Element): CompletedRaffle {
    const getElementText = (tagName: string) => 
      project.getElementsByTagName(tagName)[0]?.textContent || '';

    return {
      id: getElementText('ID'),
      title: getElementText('DisplayName'),
      description: getElementText('Conditions'),
      prizeValue: getElementText('PrizeName'),
      endDate: getElementText('EndDate'),
      participantCount: parseInt(getElementText('ParticipantCount')),
      imageUrl: getElementText('Image'),
      conditions: [],
      onlyAllowOnce: true,
      status: 'completed',
      createdAt: getElementText('CreatedDate'),
      updatedAt: getElementText('UpdatedDate'),
      projectId: getElementText('ProjectId'),
      projectKey: getElementText('ProjectKey'),
      projectName: getElementText('ProjectName'),
      projectStatus: getElementText('ProjectStatus'),
      projectType: getElementText('ProjectType'),
      projectDrawType: getElementText('DrawType'),
      projectPrizes: getElementText('Prizes'),
      projectConditions: getElementText('Conditions'),
      projectPublicResults: true,
      projectWebsite: '',
      // CompletedRaffle specific fields
      winner: getElementText('Winner'),
      ended_at: getElementText('DrawnDate'),
      project_key: getElementText('ProjectKey'),
      winningEntry: parseInt(getElementText('WinningEntry')),
      totalEntries: parseInt(getElementText('TotalEntries'))
    };
  }

  private async getToken() {
    if (!this.token) {
      await this.authenticate();
    }
    return this.token;
  }
}

export const randomPicker = new RandomPickerService();