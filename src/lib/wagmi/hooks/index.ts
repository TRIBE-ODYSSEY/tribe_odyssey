import { useWalletClient } from './useWalletClient'
import { usePublicClient } from './usePublicClient'
import { useContractWrite } from './useContractWrite'
import { type WalletClient, type PublicClient, type Transport, type Account } from 'viem'
import { type Chain } from 'viem/chains'
import { writeContract } from '../actions/contracts'

// Re-export wagmi core hooks with proper types
export {
  useAccount,
  useBalance,
  useBlockNumber,
  useConnect,
  useDisconnect,
  useEnsResolver,
  useEnsText,
  useChainId,
  useSwitchChain,
  useTransaction,
  useWaitForTransactionReceipt,
  useReadContract,
  useContractRead,
} from 'wagmi'

// Export our custom hooks
export {
  useWalletClient,
  usePublicClient,
  useContractWrite,
  writeContract,
}

// Export types
export type {
  WalletClient,
  PublicClient,
  Transport,
  Account,
  Chain,
}

// Create a hooks object for easier imports
export const wagmiHooks = {
  // Custom hooks
  useWalletClient,
  usePublicClient,
  useContractWrite,
  
  // Wagmi core hooks
  useAccount,
  useBalance,
  useBlockNumber,
  useConnect,
  useDisconnect,
  useEnsResolver,
  useEnsText,
  useChainId,
  useSwitchChain,
  useTransaction,
  useWaitForTransactionReceipt,
  useReadContract,
  useContractRead,
} as const

// Export hook types
export type WagmiHooks = typeof wagmiHooks
export type { 
  UseContractWriteConfig,
  UseContractWriteResult,
  UseReadContractConfig,
  UseReadContractResult, 
} from './useContractWrite'
