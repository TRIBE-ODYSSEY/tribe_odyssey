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
