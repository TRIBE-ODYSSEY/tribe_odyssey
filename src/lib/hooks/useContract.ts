import { Contract, ContractInterface } from "ethers";
import { useMemo } from "react";
import ERC20_ABI from '../config/abi/erc20.json';
import { getContract, simpleRpcProvider } from "../utils/contracts";
import { useWeb3React } from "./useWeb3React";

// returns null on errors
export function useContract(
  address: string | undefined,
  ABI: ContractInterface,
  withSignerIfPossible = true
): Contract | null {
  const { getSigner } = useWeb3React();
  const signer = useMemo(() => getSigner(), [getSigner]);

  return useMemo(() => {
    if (!address || !ABI || !signer) return null;
    try {
      return getContract(address, Array.isArray(ABI) ? ABI : Object.values(ABI), withSignerIfPossible ? signer : simpleRpcProvider);
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, signer, withSignerIfPossible]);
}

export function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible = true
): Contract | null {
  return useContract(tokenAddress, ERC20_ABI as unknown as ContractInterface, withSignerIfPossible);
}
