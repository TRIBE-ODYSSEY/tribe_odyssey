import { Address } from 'viem';
import { mainnet } from 'wagmi/chains';

// Contract ABIs
import stakingABI from '@src/lib/config/abi/staking.json';
import tribeABI from '@src/lib/config/abi/tribe.json';
import multiCallABI from '@src/lib/config/abi/Multicall.json';
import erc20ABI from '@src/lib/config/abi/erc20.json';
import ensRegistrarABI from '@src/lib/config/abi/EthRegistrarSubdomainRegistrar.json';

export const CONTRACT_NAMES = {
  MULTI_CALL: 'multiCall',
  TRIBE: 'tribe',
  STAKING: 'staking',
  ENS_REGISTRAR: 'ensRegistrar',
  ERC20: 'erc20'
} as const;

type ContractName = typeof CONTRACT_NAMES[keyof typeof CONTRACT_NAMES];

interface ContractConfig {
  address: Address;
  abi: any;
}

// Contract addresses by chain
const contracts: Record<ContractName, { [chainId: number]: Address }> = {
  [CONTRACT_NAMES.MULTI_CALL]: {
    [mainnet.id]: import.meta.env.VITE_MULTICALL_CONTRACT_MAINNET as Address,
  },
  [CONTRACT_NAMES.TRIBE]: {
    [mainnet.id]: import.meta.env.VITE_TRIBE_CONTRACT_MAINNET as Address,
  },
  [CONTRACT_NAMES.STAKING]: {
    [mainnet.id]: import.meta.env.VITE_STAKING_CONTRACT_MAINNET as Address,
  },
  [CONTRACT_NAMES.ENS_REGISTRAR]: {
    [mainnet.id]: import.meta.env.VITE_ENS_REGISTRAR_CONTRACT_MAINNET as Address,
  },
  [CONTRACT_NAMES.ERC20]: {
    [mainnet.id]: import.meta.env.VITE_ERC20_CONTRACT_MAINNET as Address,
  },
};

// Contract ABIs mapping
const contractABIs = {
  [CONTRACT_NAMES.MULTI_CALL]: multiCallABI,
  [CONTRACT_NAMES.TRIBE]: tribeABI,
  [CONTRACT_NAMES.STAKING]: stakingABI,
  [CONTRACT_NAMES.ENS_REGISTRAR]: ensRegistrarABI,
  [CONTRACT_NAMES.ERC20]: erc20ABI,
};

// Get contract config for a specific chain
export const getContractConfig = (name: ContractName, chainId: number = mainnet.id): ContractConfig => {
  const address = contracts[name]?.[chainId];
  if (!address) {
    throw new Error(`Contract ${name} not configured for chain ${chainId}`);
  }

  return {
    address,
    abi: contractABIs[name]
  };
};

// Helper functions to get specific contract configs
export const getMulticallConfig = (chainId?: number) => getContractConfig(CONTRACT_NAMES.MULTI_CALL, chainId);
export const getTribeConfig = (chainId?: number) => getContractConfig(CONTRACT_NAMES.TRIBE, chainId);
export const getStakingConfig = (chainId?: number) => getContractConfig(CONTRACT_NAMES.STAKING, chainId);
export const getEnsRegistrarConfig = (chainId?: number) => getContractConfig(CONTRACT_NAMES.ENS_REGISTRAR, chainId);
export const getErc20Config = (chainId?: number) => getContractConfig(CONTRACT_NAMES.ERC20, chainId);

export default contracts;
