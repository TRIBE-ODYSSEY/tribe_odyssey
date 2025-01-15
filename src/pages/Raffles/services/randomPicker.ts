import axios, { AxiosResponse } from 'axios';
import { 
  CompletedRaffle, 
  RaffleInput, 
  ParticipantInput,
  RaffleProject,
  RaffleResponse,
  RaffleProjectResponse,
  RaffleProjectCreate,
  RaffleProjectParticipant,
  Raffle
} from '../types';

interface RandomPickerConfig {
  readonly username: string;
  readonly password: string;
  readonly baseUrl: string;
  readonly UserWsdl: string;
  readonly ProjectWsdl: string;
}

interface RaffleEntryInput {
  address: string;
  points: number;
  signature: string;
}

class RandomPickerService {
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

  private async authenticate(): Promise<string> {
    const soapEnvelope = `
      <?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <LoginInsert xmlns="https://app.randompicker.com/">
            <UserName>${this.config.username}</UserName>
            <Password>${this.config.password}</Password>
          </LoginInsert>
        </soap:Body>
      </soap:Envelope>
    `;

    try {
      const response: AxiosResponse = await axios.post(
        this.config.UserWsdl,
        soapEnvelope,
        {
          headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            'SOAPAction': 'https://app.randompicker.com/LoginInsert'
          }
        }
      );

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");
      this.token = xmlDoc.getElementsByTagName("ID")[0]?.textContent ?? null;
      
      if (!this.token) {
        throw new Error('Authentication failed: No token received');
      }
      
      return this.token;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw new Error('Failed to authenticate with RandomPicker');
    }
  }

  async createRaffle(input: RaffleInput): Promise<RaffleResponse> {
    const token = await this.getToken();
    try {
      const project: RaffleProjectCreate = {
        displayName: input.displayName,
        conditions: input.conditions,
        publicResults: input.publicResults,
        website: input.website,
        prizeCount: input.prizeCount,
        prizeName: input.prizeName
      };

      const response = await this.createProject(project, token);
      const raffle: Raffle = {
        id: response.id,
        title: response.name,
        description: '',
        prizeValue: response.prizes,
        endDate: new Date().toISOString(),
        participantCount: 0,
        imageUrl: '',
        conditions: JSON.parse(response.conditions),
        onlyAllowOnce: true,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        projectId: response.id,
        projectKey: '',
        projectName: response.name,
        projectStatus: response.status,
        projectType: response.type,
        projectDrawType: response.drawType,
        projectPrizes: response.prizes,
        projectConditions: response.conditions,
        projectPublicResults: response.publicResults,
        projectWebsite: response.website
      };

      return {
        success: true,
        message: 'Raffle created successfully',
        data: [raffle]
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create raffle',
        error: error instanceof Error ? error.message : 'Unknown error',
        data: undefined
      };
    }
  }

  private async createProject(project: RaffleProjectCreate, token: string): Promise<RaffleProject> {
    const soapEnvelope = `
      <?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <ProjectCreate xmlns="https://app.randompicker.com/">
            <ID_Login>${token}</ID_Login>
            <Project>${JSON.stringify(project)}</Project>
          </ProjectCreate>
        </soap:Body>
      </soap:Envelope>
    `;

    const response = await axios.post(
      this.config.ProjectWsdl,
      soapEnvelope,
      {
        headers: {
          'Content-Type': 'text/xml;charset=UTF-8',
          'SOAPAction': 'https://app.randompicker.com/ProjectCreate'
        }
      }
    );

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, "text/xml");
    const projectData = xmlDoc.getElementsByTagName("Project")[0];
    
    if (!projectData) {
      throw new Error('Failed to create project: No project data received');
    }

    return this.parseProjectData();
  }

  async addParticipant(projectId: string, participant: ParticipantInput): Promise<RaffleProjectResponse> {
    const token = await this.getToken();
    try {
      const participantData: RaffleProjectParticipant = {
        id: '',
        publicInfo: participant.publicInfo,
        privateInfo: participant.privateInfo,
        weight: participant.weight
      };

      const response = await axios.post(
        this.config.ProjectWsdl,
        {
          ParticipantInsertProject: {
            ID_Login: token,
            ID_Project: projectId,
            Participant: JSON.stringify(participantData)
          }
        },
        {
          headers: {
            'Content-Type': 'application/soap+xml;charset=UTF-8'
          }
        }
      );

      return {
        success: true,
        message: 'Participant added successfully',
        data: response.data
      };
    } catch (error) {
      console.error('Failed to add participant:', error);
      return {
        success: false,
        message: 'Failed to add participant',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async getCompletedRaffles(): Promise<CompletedRaffle[]> {
    const token = await this.getToken();
    const soapEnvelope = `
      <?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <ProjectList xmlns="https://app.randompicker.com/">
            <ID_Login>${token}</ID_Login>
            <Status>Completed</Status>
          </ProjectList>
        </soap:Body>
      </soap:Envelope>
    `;

    try {
      const response = await axios.post(
        this.config.ProjectWsdl,
        soapEnvelope,
        {
          headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            'SOAPAction': 'https://app.randompicker.com/ProjectList'
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
    const getElementText = (tagName: string): string => 
      project.getElementsByTagName(tagName)[0]?.textContent ?? '';

    return {
      id: getElementText('ID'),
      title: getElementText('DisplayName'),
      description: getElementText('Description'),
      prizeValue: getElementText('PrizeName'),
      endDate: getElementText('EndDate'),
      participantCount: parseInt(getElementText('ParticipantCount')),
      imageUrl: getElementText('Image'),
      conditions: JSON.parse(getElementText('Conditions') || '[]'),
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
      winner: getElementText('Winner'),
      ended_at: getElementText('DrawnDate'),
      project_key: getElementText('ProjectKey'),
      winningEntry: parseInt(getElementText('WinningEntry')),
      totalEntries: parseInt(getElementText('TotalEntries'))
    };
  }

  private async getToken(): Promise<string> {
    if (!this.token) {
      await this.authenticate();
    }
    return this.token ?? '';
  }

  private parseProjectData(): RaffleProject {
    // Implementation of project data parsing
    // Returns the parsed project
    return {} as RaffleProject; // Placeholder
  }

  async getNonce(address: string) {
    const response = await this.api.get(`/nonce/${address}`);
    return response.data;
  }

  async enterRaffleProject(projectId: string, input: RaffleEntryInput): Promise<RaffleResponse> {
    const token = await this.getToken();
    try {
      const soapEnvelope = `
        <?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <ParticipantInsertProject xmlns="https://app.randompicker.com/">
              <ID_Login>${token}</ID_Login>
              <ID_Project>${projectId}</ID_Project>
              <Participant>${JSON.stringify(input)}</Participant>
            </ParticipantInsertProject>
          </soap:Body>
        </soap:Envelope>
      `;

      const response = await axios.post(
        this.config.ProjectWsdl,
        soapEnvelope,
        {
          headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            'SOAPAction': 'https://app.randompicker.com/ParticipantInsertProject'
          }
        }
      );

      return {
        success: true,
        message: 'Successfully entered raffle',
        data: [response.data]
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to enter raffle',
        error: error instanceof Error ? error.message : 'Unknown error',
        data: undefined
      };
    }
  }

  async getProjectDetails(projectId: string): Promise<RaffleProject> {
    const token = await this.getToken();
    try {
      const soapEnvelope = `
        <?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <ProjectGet xmlns="https://app.randompicker.com/">
              <ID_Login>${token}</ID_Login>
              <ID_Project>${projectId}</ID_Project>
            </ProjectGet>
          </soap:Body>
        </soap:Envelope>
      `;

      const response = await axios.post(
        this.config.ProjectWsdl,
        soapEnvelope,
        {
          headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            'SOAPAction': 'https://app.randompicker.com/ProjectGet'
          }
        }
      );

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");
      const projectData = xmlDoc.getElementsByTagName("Project")[0];
      
      if (!projectData) {
        throw new Error('Failed to fetch project: No project data received');
      }

      return this.parseProjectData();
    } catch (error) {
      console.error('Failed to fetch project details:', error);
      throw new Error('Failed to fetch project details');
    }
  }
}

export const randomPicker = new RandomPickerService();