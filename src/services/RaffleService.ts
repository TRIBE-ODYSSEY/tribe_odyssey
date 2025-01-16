import axios from 'axios';
import { ethers, JsonRpcProvider } from 'ethers';
import { 
  RaffleDetails, 
  Participant, 
  Winner, 
  RaffleProof, 
  PointTransaction,
  ApiResponse,
  RaffleResult,
  RaffleInput
} from '../pages/Raffles/types/Raffle.types';

class RaffleService {
  private readonly api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api'
  });

  private readonly provider = new JsonRpcProvider(
    import.meta.env.VITE_RPC_URL || 'https://eth-mainnet.g.alchemy.com/v2/gqqtUwI2JkpruEZDNdTi4XJltOUyj4K1'
  );

  private async generateRandomSeed(raffleId: string): Promise<string> {
    try {
      const blockNumber = await this.provider.getBlockNumber();
      const block = await this.provider.getBlock(blockNumber);
      
      if (!block || !block.hash) {
        throw new Error('Failed to get block data');
      }

      const timestamp = Date.now();
      
      return ethers.keccak256(
        ethers.solidityPacked(
          ['string', 'uint256', 'bytes32', 'uint256'],
          [raffleId, block.timestamp, block.hash, timestamp]
        )
      );
    } catch (error) {
      console.error('Failed to generate random seed:', error);
      throw new Error('Failed to generate random seed');
    }
  }

  async selectWinner(raffleId: string, entries: Participant[]): Promise<RaffleResult> {
    try {
      const seed = await this.generateRandomSeed(raffleId);
      const totalPoints = entries.reduce((sum, entry) => sum + entry.entry, 0);
      
      if (totalPoints === 0) {
        throw new Error('No entries in this raffle');
      }

      const blockNumber = await this.provider.getBlockNumber();
      const block = await this.provider.getBlock(blockNumber);
      
      if (!block || !block.hash) {
        throw new Error('Failed to get block data');
      }

      const randomNumber = BigInt(seed) % BigInt(totalPoints);
      
      let pointCount = 0;
      for (const entry of entries) {
        pointCount += entry.entry;
        if (pointCount > Number(randomNumber)) {
          const proof: RaffleProof = {
            seed,
            blockNumber,
            blockHash: block.hash,
            timestamp: block.timestamp,
            totalEntries: entries.length,
            totalPoints,
            raffleId,
            winnerAddress: entry.address,
            signature: entry.signature
          };

          const winner: Winner = {
            address: entry.address,
            entry: entry.entry,
            winning_entry: Math.floor(Math.random() * entry.entry) + 1,
            won_at: new Date().toISOString(),
            raffle_id: raffleId,
            prize_claimed: false,
            user: entry.user
          };

          return {
            winner,
            proof,
            drawnAt: new Date().toISOString(),
            verificationHash: ethers.keccak256(
              ethers.solidityPacked(
                ['bytes32', 'address', 'uint256'],
                [seed, winner.address, winner.winning_entry]
              )
            )
          };
        }
      }
      
      throw new Error('Failed to select winner');
    } catch (error) {
      console.error('Error selecting winner:', error);
      throw error;
    }
  }

  async drawRaffle(raffleId: string): Promise<RaffleResult> {
    try {
      const entries = await this.getRaffleEntries(raffleId);
      const result = await this.selectWinner(raffleId, entries);
      
      // Store the result
      await this.api.post<ApiResponse<RaffleResult>>(`/raffles/${raffleId}/draw`, result);

      return result;
    } catch (error) {
      console.error('Failed to draw raffle:', error);
      throw new Error('Failed to draw raffle');
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

  async enterRaffle(raffleId: string, entry: {
    address: string;
    entry: number;
    signature: string;
    nonce: string;
  }): Promise<Participant> {
    try {
      const response = await this.api.post(`/raffles/${raffleId}/entries`, entry);
      return response.data;
    } catch (error) {
      console.error('Failed to enter raffle:', error);
      throw new Error('Failed to enter raffle');
    }
  }

  async getRaffleEntries(raffleId: string): Promise<Participant[]> {
    try {
      const response = await this.api.get(`/raffles/${raffleId}/entries`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch raffle entries:', error);
      throw new Error('Failed to fetch raffle entries');
    }
  }

  async verifyWinner(raffleId: string, winner: Winner, proof: RaffleProof): Promise<boolean> {
    try {
      const entries = await this.getRaffleEntries(raffleId);
      const totalPoints = entries.reduce((sum, entry) => sum + entry.entry, 0);
      
      const seed = ethers.keccak256(
        ethers.solidityPacked(
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

  // Admin point management methods
  async creditPoints(adminAddress: string, userAddress: string, amount: number, signature: string, nonce: string): Promise<void> {
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
      throw new Error('Failed to credit points');
    }
  }

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
      throw new Error('Failed to transfer points');
    }
  }

  async getPointBalance(address: string): Promise<number> {
    try {
      const response = await this.api.get(`/points/balance/${address}`);
      return response.data.balance;
    } catch (error) {
      console.error('Failed to get point balance:', error);
      throw new Error('Failed to get point balance');
    }
  }

  async getPointTransactions(address: string): Promise<PointTransaction[]> {
    try {
      const response = await this.api.get(`/points/transactions/${address}`);
      return response.data.transactions;
    } catch (error) {
      console.error('Failed to get point transactions:', error);
      throw new Error('Failed to get point transactions');
    }
  }

  // Admin signature verification helper
  createAdminSignatureMessage(action: string, params: Record<string, any>, nonce: string): string {
    const orderedParams = Object.keys(params)
      .sort()
      .map(key => `${key}: ${params[key]}`)
      .join('\n');

    return `${action}\n\n${orderedParams}\nNonce: ${nonce}`;
  }

  // Nonce management
  async getNonce(address: string): Promise<string> {
    try {
      const response = await this.api.get(`/nonce/${address}`);
      return response.data.nonce;
    } catch (error) {
      console.error('Failed to get nonce:', error);
      throw new Error('Failed to get nonce');
    }
  }
}

export const raffleService = new RaffleService(); 