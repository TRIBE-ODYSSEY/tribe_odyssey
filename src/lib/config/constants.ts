import { BigNumber } from "ethers";

export const zeroAddress = "0x0000000000000000000000000000000000000000";
export const bigZero = BigNumber.from("0");

export const DefaultChainID = parseInt(
  process.env.VITE_APP_NETWORK_ID || "0",
  1
);

export const ChainList = {
  1: "Mainnet",
  4: "Rinkeby Testnet",
};
