import { mainnet, goerli } from 'wagmi/chains'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000' as const
export const ZERO_BIGNUMBER = BigInt(0)

export const DEFAULT_CHAIN_ID = parseInt(
  process.env.VITE_APP_NETWORK_ID || '1',
  10
) as number

export const CHAIN_LIST = {
  [mainnet.id]: mainnet.name,
  [goerli.id]: goerli.name
} as const

export type SupportedChainId = keyof typeof CHAIN_LIST
