export const CONTRACT_NAMES = {
  STAKING: 'STAKING',
  TRIBE: 'TRIBE',
  APE: 'APE',
  ENS_REGISTRAR: 'ENS_REGISTRAR',
  MULTI_CALL: 'MULTI_CALL',
} as const;

type ChainAddresses = {
  [key in 1 | 4 | 5]?: string;
};

type ContractName = typeof CONTRACT_NAMES[keyof typeof CONTRACT_NAMES];

const contracts: Record<ContractName, ChainAddresses> = {
  STAKING: {
    5: "0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB",
    1: "0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F",
  },
  TRIBE: {
    1: "0x77F649385cA963859693C3d3299D36dfC7324EB9",
    4: "0x8371D5E26A6E86beE233482F1D71C0c6c86972D1",
    5: "0x13a0BD6EB5124AC16fE5fA2851a5C49Dc1E8BEcF",
  },
  APE: {
    1: "0x22c08c358f62f35b742d023bf2faf67e30e5376e",
    4: "0x9a35909c8029e5321A59D708c773e315077221aC",
  },
  ENS_REGISTRAR: {
    1: "0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB",
  },
  MULTI_CALL: {
    1: "0xeefba1e63905ef1d7acba5a8513c70307c1ce441",
    4: "0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821",
  },
};

export const getContractConfig = (name: ContractName, chainId: number) => {
  const address = contracts[name]?.[chainId as keyof ChainAddresses];
  if (!address) {
    throw new Error(`Contract ${name} not found for chain ${chainId}`);
  }
  return { address: address as `0x${string}` };
};

export default contracts;
