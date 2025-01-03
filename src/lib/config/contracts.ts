export enum ChainId {
  MAINNET = 1,
  GOERLI = 5,
  RINKEBY = 4,
}

interface ContractAddresses {
  [chainId: number]: string;
}

interface Contracts {
  multiCall: ContractAddresses;
  tribe: ContractAddresses;
  ape: ContractAddresses;
  ensRegistrar: ContractAddresses;
  staking: ContractAddresses;
}

const contracts: Contracts = {
  multiCall: {
    [ChainId.MAINNET]: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
    [ChainId.RINKEBY]: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
  },
  tribe: {
    [ChainId.MAINNET]: '0x77F649385cA963859693C3d3299D36dfC7324EB9',
    [ChainId.RINKEBY]: '0x8371D5E26A6E86beE233482F1D71C0c6c86972D1',
    [ChainId.GOERLI]: '0x13a0BD6EB5124AC16fE5fA2851a5C49Dc1E8BEcF',
  },
  ape: {
    [ChainId.MAINNET]: '0x22c08c358f62f35b742d023bf2faf67e30e5376e',
    [ChainId.RINKEBY]: '0x9a35909c8029e5321A59D708c773e315077221aC',
  },
  ensRegistrar: {
    [ChainId.MAINNET]: '0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB',
  },
  staking: {
    [ChainId.MAINNET]: '0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F',
    [ChainId.GOERLI]: '0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB',
  },
};

export const getContractAddress = (
  contractName: keyof Contracts,
  chainId: ChainId
): string => {
  const address = contracts[contractName][chainId];
  if (!address) {
    throw new Error(
      `Contract ${contractName} not deployed on chain ${chainId}`
    );
  }
  return address;
};

export const isContractDeployed = (
  contractName: keyof Contracts,
  chainId: ChainId
): boolean => {
  return !!contracts[contractName][chainId];
};

export default contracts;
  