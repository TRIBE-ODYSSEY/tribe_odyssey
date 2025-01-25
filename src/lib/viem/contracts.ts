import { stakingABI } from '@src/lib/config/abi/staking.json';
import { tribeABI } from '@src/lib/config/abi/tribe.json';
import { multiCallABI } from '@src/lib/config/abi/MultiCall.json';
import type { Address } from 'viem';

export const CHAIN_IDS = {
  MAINNET: 1,
  RINKEBY: 4,
  GOERLI: 5
} as const;

export type ChainId = typeof CHAIN_IDS[keyof typeof CHAIN_IDS];

export const CONTRACT_NAMES = {
  MULTI_CALL: 'multiCall',
  TRIBE: 'tribe',
  APE: 'ape',
  ENS_REGISTRAR: 'ensRegistrar',
  STAKING: 'staking'
} as const;

interface ContractAddresses {
  [key: string]: {
    [chainId in ChainId]?: Address;
  };
}

const contracts: ContractAddresses = {
  multiCall: {
    [CHAIN_IDS.MAINNET]: "0xeefba1e63905ef1d7acba5a8513c70307c1ce441",
    [CHAIN_IDS.RINKEBY]: "0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821",
  },
  tribe: {
    [CHAIN_IDS.MAINNET]: "0x77F649385cA963859693C3d3299D36dfC7324EB9",
    [CHAIN_IDS.RINKEBY]: "0x8371D5E26A6E86beE233482F1D71C0c6c86972D1",
    [CHAIN_IDS.GOERLI]: "0x13a0BD6EB5124AC16fE5fA2851a5C49Dc1E8BEcF",
  },
  ape: {
    [CHAIN_IDS.MAINNET]: "0x22c08c358f62f35b742d023bf2faf67e30e5376e",
    [CHAIN_IDS.RINKEBY]: "0x9a35909c8029e5321A59D708c773e315077221aC",
  },
  ensRegistrar: {
    [CHAIN_IDS.MAINNET]: "0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB",
  },
  staking: {
    [CHAIN_IDS.GOERLI]: "0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB",
    [CHAIN_IDS.MAINNET]: "0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F",
  },
};

export const isValidChainId = (chainId: number): chainId is ChainId => {
  return Object.values(CHAIN_IDS).includes(chainId as ChainId);
};

export const getContractAddress = (name: keyof typeof contracts, chainId: ChainId): Address => {
  if (!isValidChainId(chainId)) {
    throw new Error(`Invalid chain ID: ${chainId}`);
  }
  
  const address = contracts[name][chainId];
  if (!address) {
    throw new Error(`Contract ${name} not deployed on chain ${chainId}`);
  }
  
  return address;
};

export const getContractABI = (name: keyof typeof contracts) => {
  switch (name) {
    case CONTRACT_NAMES.STAKING:
      return stakingABI;
    case CONTRACT_NAMES.TRIBE:
      return tribeABI;
    case CONTRACT_NAMES.MULTI_CALL:
      return multiCallABI;
    default:
      throw new Error(`ABI not found for contract ${name}`);
  }
};

export const getContractConfig = (name: keyof typeof contracts, chainId: ChainId) => {
  return {
    address: getContractAddress(name, chainId),
    abi: getContractABI(name)
  };
};

export default contracts;