import addresses from "@src/lib/config/constants/contracts";

export const getAddress = (address: any) => {
  const chainId = "1";
  return address[chainId] ? address[chainId] : address[1];
};

export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall);
};

export const getTribeAddress = () => {
  return getAddress(addresses.tribe);
};

export const getApeAddress = () => {
  return getAddress(addresses.ape);
};

export const getEnsRegistrarAddress = () => {
  return getAddress(addresses.ensRegistrar);
};

export const getStakingAddress = () => {
  return getAddress(addresses.staking);
};

export const shortenAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}; 

export const getSubgraphEndpoint = () => {
  const chainId = "1";
  if (+chainId === 1) {
    return "https://api.thegraph.com/subgraphs/name/0xapes/tribe-subgraph-mainnet";
  } else {
    return "https://api.thegraph.com/subgraphs/name/0xapes/tribe-subgraph-goerli";
  }
};
