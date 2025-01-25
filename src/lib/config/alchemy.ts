import { Alchemy, Network, AlchemySettings } from 'alchemy-sdk';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

// Alchemy SDK settings
const settings: AlchemySettings = {
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
  maxRetries: 5,
};

// Initialize Alchemy SDK
export const alchemy = new Alchemy(settings);

// Extended Alchemy service with custom functionality
export const alchemyService = {
  // NFT Methods
  nft: {
    async getNFTsForOwner(address: string) {
      try {
        const nfts = await alchemy.nft.getNftsForOwner(address);
        return nfts;
      } catch (error) {
        console.error('Error fetching NFTs:', error);
        toast.error('Failed to fetch NFTs');
        throw error;
      }
    },

    async getNFTMetadata(contractAddress: string, tokenId: string) {
      try {
        const metadata = await alchemy.nft.getNftMetadata(contractAddress, tokenId);
        return metadata;
      } catch (error) {
        console.error('Error fetching NFT metadata:', error);
        toast.error('Failed to fetch NFT metadata');
        throw error;
      }
    },

    async getContractMetadata(contractAddress: string) {
      try {
        const metadata = await alchemy.nft.getContractMetadata(contractAddress);
        return metadata;
      } catch (error) {
        console.error('Error fetching contract metadata:', error);
        toast.error('Failed to fetch contract metadata');
        throw error;
      }
    }
  },

  // Token Methods
  token: {
    async getTokenBalances(address: string) {
      try {
        const balances = await alchemy.core.getTokenBalances(address);
        return balances;
      } catch (error) {
        console.error('Error fetching token balances:', error);
        toast.error('Failed to fetch token balances');
        throw error;
      }
    },

    async getTokenMetadata(contractAddress: string) {
      try {
        const metadata = await alchemy.core.getTokenMetadata(contractAddress);
        return metadata;
      } catch (error) {
        console.error('Error fetching token metadata:', error);
        toast.error('Failed to fetch token metadata');
        throw error;
      }
    }
  },

  // Transaction Methods
  transaction: {
    async getTransaction(hash: string) {
      try {
        const tx = await alchemy.core.getTransaction(hash);
        return tx;
      } catch (error) {
        console.error('Error fetching transaction:', error);
        toast.error('Failed to fetch transaction');
        throw error;
      }
    },

    async sendTransaction(transaction: any) {
      try {
        const response = await alchemy.core.sendTransaction(transaction);
        return response;
      } catch (error) {
        console.error('Error sending transaction:', error);
        toast.error('Failed to send transaction');
        throw error;
      }
    },

    async waitForTransaction(hash: string) {
      try {
        const receipt = await alchemy.core.waitForTransaction(hash);
        return receipt;
      } catch (error) {
        console.error('Error waiting for transaction:', error);
        toast.error('Failed to wait for transaction');
        throw error;
      }
    }
  },

  // Contract Methods
  contract: {
    async getContractEvents(contractAddress: string, eventName: string) {
      try {
        const logs = await alchemy.core.getLogs({
          address: contractAddress,
          topics: [ethers.id(eventName)]
        });
        return logs;
      } catch (error) {
        console.error('Error fetching contract events:', error);
        toast.error('Failed to fetch contract events');
        throw error;
      }
    }
  },

  // Blockchain Methods
  blockchain: {
    async getLatestBlock() {
      try {
        const block = await alchemy.core.getBlock('latest');
        return block;
      } catch (error) {
        console.error('Error fetching latest block:', error);
        toast.error('Failed to fetch latest block');
        throw error;
      }
    },

    async getGasPrice() {
      try {
        const gasPrice = await alchemy.core.getGasPrice();
        return gasPrice;
      } catch (error) {
        console.error('Error fetching gas price:', error);
        toast.error('Failed to fetch gas price');
        throw error;
      }
    }
  },

  // WebSocket Methods
  websocket: {
    subscribeToNewBlocks(callback: (blockNumber: number) => void) {
      return alchemy.ws.on('block', callback);
    },

    subscribeToContractEvents(
      contractAddress: string,
      eventName: string,
      callback: (log: any) => void
    ) {
      const filter = {
        address: contractAddress,
        topics: [ethers.id(eventName)]
      };
      return alchemy.ws.on(filter, callback);
    }
  },

  // Utility Methods
  utils: {
    async isContractAddress(address: string) {
      try {
        return await alchemy.core.isContractAddress(address);
      } catch (error) {
        console.error('Error checking contract address:', error);
        return false;
      }
    },
    formatEther: ethers.formatEther,
    parseEther: ethers.parseEther,
    encodeFunction: (abi: any, params: any[]) => {
      const iface = new ethers.Interface([abi]);
      return iface.encodeFunctionData(abi.name, params);
    },
    decodeFunctionResult: (abi: any, data: string) => {
      const iface = new ethers.Interface([abi]);
      return iface.decodeFunctionResult(abi.name, data);
    },
    formatUnits: ethers.formatUnits,
    parseUnits: ethers.parseUnits,
    keccak256: ethers.keccak256,
    toHex: ethers.hexlify,
    fromHex: ethers.hexlify,
    isAddress: ethers.isAddress,
    getAddress: ethers.getAddress,
  },

  // Auth Methods
  auth: {
    async signIn() {
      try {
        const provider = await alchemy.config.getProvider();
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        return { address };
      } catch (error) {
        console.error('Error signing in:', error);
        toast.error('Failed to sign in');
        throw error;
      }
    },

    async signOut() {
      // Implement your sign-out logic here
    }
  },
};

// Export types and constants
export type { Network };
export const SUPPORTED_NETWORKS = {
  MAINNET: Network.ETH_MAINNET,
  SEPOLIA: Network.ETH_SEPOLIA,
  GOERLI: Network.ETH_GOERLI
}; 