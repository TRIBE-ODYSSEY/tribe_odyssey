import { Contract } from "ethers";
import { useMemo } from "react";
import ERC20_ABI from "../config/abi/erc20.json";
import { getContract } from "../utils/contracts";
import { useWeb3React } from "./useWeb3React";

// returns null on errors
export function useContract(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): Contract | null {
  const { signer } = useWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !signer) return null;
    try {
      return getContract(address, ABI, signer);
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, signer]);
}

export function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
}
