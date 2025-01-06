import addresses from "../config/contracts";

export const getAddress = (address) => {
  const chainId = process.env.VITE_APP_NETWORK_ID || "1";
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

export const getSubgraphEndpoint = () => {
  const chainId = process.env.VITE_APP_NETWORK_ID || "1";
  if (+chainId === 1) {
    return "https://api.thegraph.com/subgraphs/name/0xapes/tribe-subgraph-mainnet";
  } else {
    return "https://api.thegraph.com/subgraphs/name/0xapes/tribe-subgraph-goerli";
  }
};

export const isZeroAddress = (address: string) => {
  return address === "0x0000000000000000000000000000000000000000";
};
