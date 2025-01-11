import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
})

export type PublicClient = typeof publicClient
export type WalletClient = typeof walletClient