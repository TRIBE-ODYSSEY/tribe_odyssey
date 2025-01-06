import { useMemo } from "react"
import { usePublicClient, useWalletClient } from 'wagmi'
import { type PublicClient, type WalletClient } from 'viem'
import ERC20_ABI from '../config/abi/erc20.json'
import { getContractInstance } from "../utils/contracts"

export function useContract<T>(
  address: string | undefined,
  ABI: readonly unknown[],
  withSignerIfPossible = true
): T | null {
  const publicClient = usePublicClient() as PublicClient
  const { data: walletClient } = useWalletClient() as { data: WalletClient | undefined }

  return useMemo(() => {
    if (!address || !ABI) return null
    
    try {
      if (withSignerIfPossible && walletClient) {
        return getContractInstance(address, ABI as any[], walletClient) as T
      }
      return getContractInstance(address, ABI as any[], publicClient) as T
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, publicClient, walletClient, withSignerIfPossible])
}

export function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible = true
) {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}