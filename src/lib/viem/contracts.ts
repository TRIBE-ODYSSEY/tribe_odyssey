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

const contracts = {
  multiCall: {
    [CHAIN_IDS.MAINNET]: "0xeefba1e63905ef1d7acba5a8513c70307c1ce441",
  },
  tribe: {
    [CHAIN_IDS.MAINNET]: "0x77F649385cA963859693C3d3299D36dfC7324EB9",
    [CHAIN_IDS.GOERLI]: "0x13a0BD6EB5124AC16fE5fA2851a5C49Dc1E8BEcF",
  },
  ape: {
    [CHAIN_IDS.MAINNET]: "0x22c08c358f62f35b742d023bf2faf67e30e5376e",

  },
  ensRegistrar: {
    [CHAIN_IDS.MAINNET]: "0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB",
  },
  staking: {
    [CHAIN_IDS.MAINNET]: "0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F",
    [CHAIN_IDS.GOERLI]: "0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB",
  },
};

export const getContractConfig = (name: keyof typeof contracts, chainId: ChainId) => {
  const address = contracts[name]?.[CHAIN_IDS.MAINNET];
  if (!address) throw new Error(`Contract ${name} not deployed on chain ${chainId}`);

  const abi = {
    [CONTRACT_NAMES.STAKING]: stakingABI,
    [CONTRACT_NAMES.TRIBE]: tribeABI,
    [CONTRACT_NAMES.MULTI_CALL]: multiCallABI,
    [CONTRACT_NAMES.APE]: apeABI,
    [CONTRACT_NAMES.ENS_REGISTRAR]: ensRegistrarABI,
  }[name];

  return { address, abi };
};

export default contracts;