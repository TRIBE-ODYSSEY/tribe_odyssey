import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'
import { base, mainnet } from 'wagmi/chains'
import { createConfig } from 'wagmi'

// Get WalletConnect Project ID from environment variables
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'e6937fb240cd6f4df6739b75bf0b324d'

// Create wagmi config
export const config = createConfig(
  getDefaultConfig({
    appName: 'Tribe Odyssey',
    projectId,
    chains: [mainnet, base],
    transports: {
      [mainnet.id]: http(),
      [base.id]: http(),
    },
  }),
)
