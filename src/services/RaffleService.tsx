import axios from 'axios';
import { solidityPacked } from 'ethers';
import { 
  RaffleDetails, 
  Participant, 
  Winner, 
  RaffleProof, 
  ApiResponse,
  RaffleResult,
  RaffleInput
} from '../pages/Raffles/types/Raffle.types';
import { keccak256, toBytes } from 'viem';

class RaffleService {
  private readonly api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://tribeodyssey.net',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  // Create signature message for admin actions
  createAdminSignatureMessage(
    action: string,
    data: Record<string, any>,
    nonce: string
  ): string {
    return `${action}\n\n${Object.entries(data)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n')}\nNonce: ${nonce}`;
  }

  // Get nonce for signing
  async getNonce(address: string): Promise<string> {
    const response = await this.api.get<{ nonce: string }>(`/nonce/${address}`);
    return response.data.nonce;
  }

  // Enter raffle
  async enterRaffle(raffleId: string, entry: {
    address: string;
    entry: number;
    signature: string;
    nonce: string;
  }): Promise<Participant> {
    try {
      const response = await this.api.post<ApiResponse<Participant>>(
        `/raffles/${raffleId}/entries`,
        entry
      );
      return response.data.data;
    } catch (error) {
      console.error('Failed to enter raffle:', error);
      throw new Error('Failed to enter raffle');
    }
  }

  // Credit points
  async creditPoints(
    adminAddress: string,
    userAddress: string,
    amount: number,
    signature: string,
    nonce: string
  ): Promise<void> {
    try {
      const response = await this.api.post('/points/credit', {
        adminAddress,
        userAddress,
        amount,
        signature,
        nonce,
        timestamp: Date.now()
      });

      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to credit points');
      }
    } catch (error) {
      console.error('Failed to credit points:', error);
      throw error;
    }
  }

  // Transfer points
  async transferPoints(
    adminAddress: string,
    fromAddress: string,
    toAddress: string,
    amount: number,
    signature: string,
    nonce: string
  ): Promise<void> {
    try {
      const response = await this.api.post('/points/transfer', {
        adminAddress,
        fromAddress,
        toAddress,
        amount,
        signature,
        nonce,
        timestamp: Date.now()
      });

      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to transfer points');
      }
    } catch (error) {
      console.error('Failed to transfer points:', error);
      throw error;
    }
  }

  // Generate random seed for raffle
  async generateRandomSeed(raffleId: string): Promise<string> {
    const timestamp = Date.now();
    return keccak256(
      toBytes(`${raffleId}:${timestamp}:${Math.random()}`)
    );
  }

  // Draw raffle
  async drawRaffle(raffleId: string): Promise<RaffleResult> {
    try {
      const entries = await this.getRaffleEntries(raffleId);
      const seed = await this.generateRandomSeed(raffleId);
      const verificationHash = keccak256(toBytes(`${seed}:${Date.now()}`));
      
      const winner = this.selectWinner(entries, seed);
      const result: RaffleResult = {
        winner,
        drawnAt: new Date().toISOString(),
        proof: {
          timestamp: Date.now(),
          blockHash: seed,
          raffleId,
          seed,
          blockNumber: 0n,
          totalEntries: entries.length,
          totalPoints: entries.reduce((sum, entry) => sum + entry.entry, 0),
          entries,
          winnerAddress: winner.address,
          signature: '' // Add actual signature if needed
        },
        verificationHash
      };
      
      await this.api.post(`/raffles/${raffleId}/draw`, result);
      return result;
    } catch (error) {
      console.error('Failed to draw raffle:', error);
      throw new Error('Failed to draw raffle');
    }
  }

  // Helper method to select winner
  private selectWinner(entries: Participant[], seed: string): Winner {
    const totalPoints = entries.reduce((sum, entry) => sum + entry.entry, 0);
    const randomNumber = BigInt(seed) % BigInt(totalPoints);
    
    let pointCount = 0;
    for (const entry of entries) {
      pointCount += entry.entry;
      if (pointCount > Number(randomNumber)) {
        return {
          address: entry.address,
          entry: entry.entry,
          winning_entry: Math.floor(Math.random() * entry.entry) + 1,
          won_at: new Date().toISOString(),
          raffle_id: entry.raffle_id,
          prize_claimed: false,
          user: entry.user
        };
      }
    }
    
    throw new Error('Failed to select winner');
  }

  // Get raffle entries
  async getRaffleEntries(raffleId: string): Promise<Participant[]> {
    try {
      const response = await this.api.get(`/raffles/${raffleId}/entries`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch raffle entries:', error);
      throw new Error('Failed to fetch raffle entries');
    }
  }

  async createRaffle(input: RaffleInput): Promise<RaffleDetails> {
    try {
      const metadata: Omit<RaffleDetails, 'id' | 'project_status'> = {
        ...input,
        entry_count: 0,
        total_points: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        admin_address: input.adminAddress,
        min_points: input.min_points || 0,
        max_entries_per_user: input.max_entries_per_user || 0
      };
      
      const response = await this.api.post('/raffles', metadata);
      return response.data;
    } catch (error) {
      console.error('Failed to create raffle:', error);
      throw new Error('Failed to create raffle');
    }
  }

  async updateRaffle(raffleId: string, input: RaffleInput): Promise<RaffleDetails> {
    try {
      const metadata: Partial<RaffleDetails> = {
        ...input,
        updated_at: new Date().toISOString(),
        admin_address: input.adminAddress
      };
      
      const response = await this.api.put(`/raffles/${raffleId}`, metadata);
      return response.data;
    } catch (error) {
      console.error('Failed to update raffle:', error);
      throw new Error('Failed to update raffle');
    }
  }

  async deleteRaffle(raffleId: string, auth: { signature: string, nonce: string, adminAddress: string }): Promise<void> {
    try {
      await this.api.delete(`/raffles/${raffleId}`, { data: auth });
    } catch (error) {
      console.error('Failed to delete raffle:', error);
      throw new Error('Failed to delete raffle');
    }
  }

  async getRaffle(raffleId: string): Promise<RaffleDetails> {
    try {
      const response = await this.api.get(`/raffles/${raffleId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch raffle:', error);
      throw new Error('Failed to fetch raffle');
    }
  }

  async getAllRaffles(status?: 'active' | 'completed' | 'cancelled', auth?: { signature: string, nonce: string }): Promise<RaffleDetails[]> {
    try {
      const response = await this.api.get('/raffles', {
        params: { status },
        headers: auth ? {
          'X-Signature': auth.signature,
          'X-Nonce': auth.nonce
        } : undefined
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch raffles:', error);
      throw new Error('Failed to fetch raffles');
    }
  }

  async verifyWinner(raffleId: string, winner: Winner, proof: RaffleProof): Promise<boolean> {
    try {
      const entries = await this.getRaffleEntries(raffleId);
      const totalPoints = entries.reduce((sum, entry) => sum + entry.entry, 0);
      
      const seed = keccak256(
        solidityPacked(
          ['string', 'uint256', 'bytes32', 'uint256'],
          [raffleId, proof.timestamp, proof.blockHash, proof.timestamp]
        )
      );

      const randomNumber = BigInt(seed) % BigInt(totalPoints);
      let pointCount = 0;

      for (const entry of entries) {
        pointCount += entry.entry;
        if (pointCount > Number(randomNumber)) {
          return entry.address === winner.address;
        }
      }

      return false;
    } catch (error) {
      console.error('Failed to verify winner:', error);
      throw new Error('Failed to verify winner');
    }
  }

  // Helper method for handling file uploads
  private async handleFileUpload(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await this.uploadImage(formData);
      return response.imageUrl;
    } catch (error) {
      console.error('Failed to upload file:', error);
      throw new Error('Failed to upload file');
    }
  }

  // Helper method for image validation
  private validateImage(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      throw new Error('Invalid file type. Please upload a JPEG, PNG, GIF, or WEBP image.');
    }

    if (file.size > maxSize) {
      throw new Error('File size too large. Maximum size is 5MB.');
    }

    return true;
  }

  // Helper method for handling API errors
  private handleApiError(error: any): never {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || error.message;
      throw new Error(message);
    }
    throw error;
  }

  async uploadImage(formData: FormData): Promise<{ imageUrl: string }> {
    try {
      // Get the file from FormData
      const file = formData.get('file') as File;
      
      // Validate the image before uploading
      this.validateImage(file);

      const response = await this.api.post<ApiResponse<{ imageUrl: string }>>(
        '/upload/image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to upload image');
      }

      return response.data.data;
    } catch (error) {
      return this.handleApiError(error);
    }
  }

  // Public method to handle file uploads from components
  async uploadRaffleImage(file: File): Promise<string> {
    try {
      return await this.handleFileUpload(file);
    } catch (error) {
      return this.handleApiError(error);
    }
  }
}

export const raffleService = new RaffleService(); 