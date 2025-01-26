import { Alchemy, Network, AlchemySettings } from 'alchemy-sdk';

// Staking related types
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

// Export types and constants
export type { Network };
export const SUPPORTED_NETWORKS = {
  MAINNET: Network.ETH_MAINNET,
  SEPOLIA: Network.ETH_SEPOLIA,
  GOERLI: Network.ETH_GOERLI
}; 