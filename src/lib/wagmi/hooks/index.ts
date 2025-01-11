import { useWalletClient } from './useWalletClient'
import { usePublicClient } from './usePublicClient'
import { useContractWrite } from './useContractWrite'
import { type WalletClient, type PublicClient, type Transport, type Account } from 'viem'
import { type Chain } from 'viem/chains'

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
} from '@wagmi/core'

// Export our custom hooks
export {
  useWalletClient,
  usePublicClient,
  useContractWrite,
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
} as const

// Export hook types
export type WagmiHooks = typeof wagmiHooks
export type { 
  UseContractWriteConfig,
  UseContractWriteResult,
  UseReadContractConfig,
  UseReadContractResult,  
  useReadContract  
} from './useContractWrite'
