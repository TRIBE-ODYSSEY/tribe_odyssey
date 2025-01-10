import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http, createConfig } from '@wagmi/core'
import { base, mainnet } from 'wagmi/chains'

const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'e6937fb240cd6f4df6739b75bf0b324d'

// Create wagmi config
export const config = createConfig({
  chains: [mainnet, base],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})

// RainbowKit configuration
export const rainbowConfig = getDefaultConfig({
  appName: 'Tribe Odyssey',
  projectId,
  chains: [mainnet, base],
  ssr: true,
})
