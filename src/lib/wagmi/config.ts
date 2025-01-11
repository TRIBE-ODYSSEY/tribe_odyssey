import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'

export const { wallets } = getDefaultWallets({
  appName: 'Tribe Odyssey',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || '',
})

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

export type WagmiConfig = typeof config