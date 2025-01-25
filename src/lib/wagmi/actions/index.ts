import { sendTransaction, signMessage, getBalance, getChainId } from './wallet'
import { readContract, writeContract } from './contracts'

export const wagmiActions = {
  // Wallet actions
  sendTransaction,
  signMessage,
  getBalance,
  getChainId,
  
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
  getBalance,
  getChainId,
  readContract,
  writeContract,
}
