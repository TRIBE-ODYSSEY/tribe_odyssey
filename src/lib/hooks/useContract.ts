import { Contract, BaseContract, JsonRpcProvider } from "ethers";
import { useMemo } from "react";
import ERC20_ABI from '../config/abi/erc20.json';
import { getContract } from "../utils/contracts";
import { useWeb3React } from "./useWeb3React";

// returns null on errors
export function useContract<T extends BaseContract = Contract>(
  address: string | undefined,
  ABI: any[], // TODO: Add proper type for ABI
  withSignerIfPossible = true
): T | null {
  const { getSigner, provider } = useWeb3React();

  return useMemo(() => {
    if (!address || !ABI) return null;
    try {
      if (withSignerIfPossible) {
        const signerPromise = getSigner();
        if (signerPromise) {
          // Wait for signer promise to resolve
          return signerPromise.then((signer) => {
            if (signer) {
              return getContract(address, ABI, signer) as T;
            }
            return null;
          });
        }
      }
      if (provider instanceof JsonRpcProvider) {
        return getContract(address, ABI, provider) as T;
      }
      return null;
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, getSigner, provider, withSignerIfPossible]) as T | null;
}

export function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible = true
): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
}