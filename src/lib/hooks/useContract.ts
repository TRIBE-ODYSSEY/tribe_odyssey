import { useMemo } from "react"
import { type PublicClient, type WalletClient } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'
import ERC20_ABI from '../config/abi/erc20.json'
import { getContractInstance } from "../utils/contracts"

export function useContract<T = any>(
  address: string | undefined,
  ABI: any[],
  withSignerIfPossible = true
): T | null {
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  return useMemo(() => {
    if (!address || !ABI) return null
    
    try {
      if (withSignerIfPossible && walletClient) {
        return getContractInstance(address, ABI, walletClient) as T
      }
      return getContractInstance(address, ABI, publicClient) as T
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