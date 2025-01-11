//ts-ignore
import { useWalletClient } from './useWalletClient'
import { usePublicClient } from './usePublicClient'
import { useContractWrite } from './useContractWrite'

// Re-export wagmi hooks we use frequently
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

// Export hook types
export type {
  ContractWriteConfig,
  ContractWriteResult,
} from './useContractWrite'

// Create a hooks object for easier imports
export const wagmiHooks = {
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

export type WagmiHooks = typeof wagmiHooks
