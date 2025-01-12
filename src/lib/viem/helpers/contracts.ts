import contracts, { isValidChainId, CONTRACT_NAMES, CHAIN_IDS } from '../contracts';
type ChainId = typeof CHAIN_IDS[keyof typeof CHAIN_IDS];
import { stakingABI } from '@src/lib/config/abi/staking.json';
import { tribeABI } from '@src/lib/config/abi/tribe.json';
import { multiCallABI } from '@src/lib/config/abi/multiCall.json';

// Define contract config type
type ContractConfig = {
  address: string;
  abi: any; // Replace 'any' with your specific ABI type if available
};

// Define supported contracts
type SupportedContracts = {
  staking: ContractConfig;
  tribe: ContractConfig;
  multiCall: ContractConfig;
};

/**
 * Gets contract configuration for all supported contracts
 * @param chainId - The chain ID to get contracts for
 * @throws Error if chain ID is invalid or contract not deployed
 */
export const getContractConfig = (chainId: ChainId = 1): SupportedContracts => {
  if (!isValidChainId(chainId)) {
    throw new Error(`Invalid chain ID: ${chainId}`);
  }

  return {
    staking: {
      address: contracts[CONTRACT_NAMES.STAKING][chainId] ?? 
        throwError(`Staking contract not deployed on chain ${chainId}`),
      abi: stakingABI
    },
    tribe: {
      address: contracts[CONTRACT_NAMES.TRIBE][chainId] ?? 
        throwError(`Tribe contract not deployed on chain ${chainId}`),
      abi: tribeABI
    },
    multiCall: {
      address: contracts[CONTRACT_NAMES.MULTI_CALL][chainId] ?? 
        throwError(`MultiCall contract not deployed on chain ${chainId}`),
      abi: multiCallABI
    }
  };
};

/**
 * Gets staking contract configuration
 * @param chainId - The chain ID to get contract for
 */
export const getStakingContract = (chainId: ChainId = 1): ContractConfig => {
  if (!isValidChainId(chainId)) {
    throw new Error(`Invalid chain ID: ${chainId}`);
  }

  return {
    address: contracts[CONTRACT_NAMES.STAKING][chainId] ?? 
      throwError(`Staking contract not deployed on chain ${chainId}`),
    abi: stakingABI
  };
};

/**
 * Gets tribe contract configuration
 * @param chainId - The chain ID to get contract for
 */
export const getTribeContract = (chainId: ChainId = 1): ContractConfig => {
  if (!isValidChainId(chainId)) {
    throw new Error(`Invalid chain ID: ${chainId}`);
  }

  return {
    address: contracts[CONTRACT_NAMES.TRIBE][chainId] ?? 
      throwError(`Tribe contract not deployed on chain ${chainId}`),
    abi: tribeABI
  };
};

// Helper function for throwing errors
const throwError = (message: string): never => {
  throw new Error(message);
};

// Add utility functions for contract interactions
export const getStakingFunctions = (chainId: ChainId = 1) => {
  const contract = getStakingContract(chainId);
  
  return {
    stake: (tokenIds: number[]) => ({
      ...contract,
      functionName: 'stakeMany',
      args: [tokenIds.map(id => BigInt(id))]
    }),
    
    unstake: (tokenIds: number[]) => ({
      ...contract,
      functionName: 'unstakeMany',
      args: [tokenIds.map(id => BigInt(id))]
    }),
    
    getStakedTokens: (address: string) => ({
      ...contract,
      functionName: 'getUserStakedNFTs',
      args: [address]
    })
  };
}; 