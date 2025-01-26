import stakingABI from '@src/lib/config/abi/staking.json';
import tribeABI from '@src/lib/config/abi/tribe.json';
import multiCallABI from '@src/lib/config/abi/MultiCall.json';
import apeABI from '@src/lib/config/abi/erc721.json';
import ensRegistrarABI from '@src/lib/config/abi/EthRegistrarSubdomainRegistrar.json';

export const CHAIN_IDS = {
  MAINNET: 1,
  GOERLI: 5
} as const;

export const CONTRACT_NAMES = {
  MULTI_CALL: 'multiCall',
  TRIBE: 'tribe',
  APE: 'ape',
  ENS_REGISTRAR: 'ensRegistrar',
  STAKING: 'staking'
} as const;

type ChainId = typeof CHAIN_IDS[keyof typeof CHAIN_IDS];
type ContractName = typeof CONTRACT_NAMES[keyof typeof CONTRACT_NAMES];

const contracts: Record<ContractName, { [key in ChainId]?: Address }> = {
  multiCall: {
    [CHAIN_IDS.MAINNET]: import.meta.env.VITE_MULTICALL_CONTRACT_MAINNET as Address,
  },
  tribe: {
    [CHAIN_IDS.MAINNET]: import.meta.env.VITE_TRIBE_CONTRACT_MAINNET as Address,
  },
  staking: {
    [CHAIN_IDS.MAINNET]: import.meta.env.VITE_STAKING_CONTRACT_MAINNET as Address,
  },
  ape: {
    [CHAIN_IDS.MAINNET]: import.meta.env.VITE_APE_CONTRACT_MAINNET as Address,
  },
  ensRegistrar: {
    [CHAIN_IDS.MAINNET]: import.meta.env.VITE_ENS_REGISTRAR_CONTRACT_MAINNET as Address,
  },
};


export const getContractConfig = (Name: ContractName, chainId: ChainId) => {
const address = contracts[Name]?.[CHAIN_IDS.MAINNET];
  console.log(address);

  
  if (!address) throw new Error(`Contract ${Name} not deployed on chain ${chainId}`);

  const abi = {
    [CONTRACT_NAMES.STAKING]: stakingABI,
    [CONTRACT_NAMES.TRIBE]: tribeABI,
    [CONTRACT_NAMES.MULTI_CALL]: multiCallABI,
    [CONTRACT_NAMES.APE]: apeABI,
    [CONTRACT_NAMES.ENS_REGISTRAR]: ensRegistrarABI,
  };
  
  return { address, abi };
};

export default contracts;