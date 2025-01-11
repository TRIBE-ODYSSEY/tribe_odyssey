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
  useEnsAddress,
  useEnsName,
  useNetwork,
  useSwitchNetwork,
  useTransaction,
  useWaitForTransaction,
} from 'wagmi'

// Export our custom hooks
export {
  useWalletClient,
  usePublicClient,
  useContractWrite,
}

// Export hook types
export type {
  UseContractWriteConfig,
  UseContractWriteResult,
} from './useContractWrite'

// Create a hooks object for easier imports
export const wagmiHooks = {
  useWalletClient,
  usePublicClient,
  useContractWrite,
} as const

export type WagmiHooks = typeof wagmiHooks
