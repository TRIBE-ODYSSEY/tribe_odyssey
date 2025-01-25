import { Alchemy, Network, AlchemySettings } from 'alchemy-sdk';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import type { Address } from 'viem';
import { BrowserProvider, JsonRpcSigner } from 'ethers';

// Add staking related types
export interface PoolInfo {
  rewardRate: bigint;
  lastRewardTime: bigint;
  accRewardPerShare: bigint;
  totalStaked: bigint;
}

export interface StakedToken {
  tokenId: bigint;
  stakedAt: bigint;
}

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
  // Provider and Signer Management
  provider: {
    async getProvider(): Promise<BrowserProvider> {
      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('No Web3 provider found. Please install MetaMask or another wallet.');
      }
      try {
        // Use window.ethereum directly instead of Alchemy provider for wallet interactions
        return new ethers.BrowserProvider(window.ethereum);
      } catch (error) {
        console.error('Provider error:', error);
        throw new Error('Failed to initialize provider');
      }
    },

    async getSigner(): Promise<JsonRpcSigner> {
      try {
        const provider = await this.getProvider();
        const signer = await provider.getSigner();
        if (!signer) throw new Error('No signer available');
        return signer;
      } catch (error) {
        console.error('Signer error:', error);
        throw new Error('Please connect your wallet first');
      }
    }
  },

  // Auth Methods
  auth: {
    async connect() {
      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('No Web3 provider found. Please install MetaMask or another wallet.');
      }

      try {
        const provider = await alchemyService.provider.getProvider();
        
        // Request account access
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });

        if (!accounts || (Array.isArray(accounts) && accounts.length === 0)) {
          throw new Error('No accounts found');
        }

        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        // Verify network
        const network = await provider.getNetwork();
        const chainId = Number(network.chainId);
        
        if (chainId !== 1) { // Mainnet
          await this.switchNetwork();
        }

        // Store connection state
        localStorage.setItem('walletConnected', 'true');
        
        return { address, chainId };
      } catch (error) {
        console.error('Connection error:', error);
        toast.error('Failed to connect wallet');
        throw error;
      }
    },

    async disconnect() {
      try {
        // Clear any local connection state
        localStorage.removeItem('walletConnected');
        // Emit disconnect event
        window.dispatchEvent(new Event('wallet_disconnected'));
        return true;
      } catch (error) {
        console.error('Disconnect error:', error);
        toast.error('Failed to disconnect wallet');
        throw error;
      }
    },

    async getAddress(): Promise<string | null> {
      try {
        const provider = await alchemyService.provider.getProvider();
        const accounts = await provider.send('eth_accounts', []);
        return accounts[0] || null;
      } catch {
        return null;
      }
    },

    async switchNetwork() {
      try {
        const provider = await alchemyService.provider.getProvider();
        await provider.send('wallet_switchEthereumChain', [{ chainId: '0x1' }]); // Mainnet
      } catch (error: any) {
        console.error('Network switch error:', error);
        toast.error('Failed to switch network');
        throw error;
      }
    }
  },

  // NFT Methods
  nft: {
    async getNftsForOwner(address: string, options?: any) {
      try {
        const nfts = await alchemy.nft.getNftsForOwner(address, options);
        return nfts;
      } catch (error) {
        console.error('Error fetching NFTs:', error);
        toast.error('Failed to fetch NFTs');
        throw error;
      }
    },

    async getNftMetadata(contractAddress: string, tokenId: string) {
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

  // Staking Methods
  staking: {
    async getUserStakedNFTs(contractAddress: Address): Promise<StakedToken[]> {
      try {
        const provider = await alchemyService.provider.getProvider();
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          ['function getUserStakedNFTs(address) view returns (tuple(uint256 tokenId, uint256 stakedAt)[])'],
          provider
        );
        const address = await signer.getAddress();
        return await contract.getUserStakedNFTs(address);
      } catch (error) {
        console.error('Error fetching staked NFTs:', error);
        toast.error('Failed to fetch staked NFTs');
        throw error;
      }
    },

    async getPoolInfo(contractAddress: Address): Promise<PoolInfo> {
      try {
        const provider = await alchemyService.provider.getProvider();
        const contract = new ethers.Contract(
          contractAddress,
          ['function getPoolInfo() view returns (tuple(uint256 rewardRate, uint256 lastRewardTime, uint256 accRewardPerShare, uint256 totalStaked))'],
          provider
        );
        return await contract.getPoolInfo();
      } catch (error) {
        console.error('Error fetching pool info:', error);
        toast.error('Failed to fetch pool info');
        throw error;
      }
    },

    async isApprovedForAll(tokenAddress: Address): Promise<boolean> {
      try {
        const provider = await alchemyService.provider.getProvider();
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          tokenAddress,
          ['function isApprovedForAll(address owner, address operator) view returns (bool)'],
          provider
        );
        const address = await signer.getAddress();
        const stakingAddress = import.meta.env.VITE_STAKING_CONTRACT_ADDRESS;
        return await contract.isApprovedForAll(address, stakingAddress);
      } catch (error) {
        console.error('Error checking approval:', error);
        toast.error('Failed to check approval status');
        throw error;
      }
    }
  },

  // Core functionality
  core: {
    getProvider: async () => await alchemy.config.getProvider(),
    getSigner: async () => {
      const provider = await alchemy.config.getProvider();
      return provider.getSigner();
    },
    sendTransaction: alchemy.core.sendTransaction.bind(alchemy.core),
    waitForTransaction: alchemy.core.waitForTransaction.bind(alchemy.core)
  },
};

// Export types and constants
export type { Network };
export const SUPPORTED_NETWORKS = {
  MAINNET: Network.ETH_MAINNET,
  SEPOLIA: Network.ETH_SEPOLIA,
  GOERLI: Network.ETH_GOERLI
}; 