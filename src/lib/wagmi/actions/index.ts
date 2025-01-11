import { sendTransaction, signMessage } from './wallet'
import { readContract, writeContract } from './contracts'

export const wagmiActions = {
  // Wallet actions
  sendTransaction,
  signMessage,
  
  // Contract actions
  readContract,
  writeContract,
} as const

// Type exports
export type { Hash, Address } from 'viem'
export type WagmiActions = typeof wagmiActions

// Individual exports
export {
  sendTransaction,
  signMessage,
  readContract,
  writeContract,
}
