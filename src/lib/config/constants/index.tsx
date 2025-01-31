import { Address } from "viem";

export const zeroAddress: Address = "0x0000000000000000000000000000000000000000";
export const bigZero = BigInt(0);

export const DefaultChainID = parseInt(
  String(import.meta.env.VITE_CHAIN_ID || "0"),
  1
);

export const ChainList = {
  1: "Mainnet", 
  4: "Rinkeby Testnet",
};
