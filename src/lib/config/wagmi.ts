import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'
import { getDefaultConfig } from "connectkit"

// Get environment variables
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID
const alchemyId = import.meta.env.VITE_ALCHEMY_ID

if (!projectId) throw new Error('Missing VITE_WALLET_CONNECT_PROJECT_ID')

export const config = createConfig(
  getDefaultConfig({
    // Your dApp's info
    appName: 'Tribe Odyssey',
    appIcon: 'https://tribeodyssey.net/favicon.ico',
    appDescription: 'Tribe Odyssey - The Expanse',
    appUrl: 'https://tribeodyssey.net',
    
    // Chains configuration
    chains: [mainnet, sepolia],
    
    // Transport configuration with fallbacks
    transports: {
      [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${alchemyId}`),
      [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${alchemyId}`),
    },

    // Wallet connectors
    connectors: [
      injected({
        shimDisconnect: true,
      }),
      metaMask({
        shimDisconnect: true,
        UNSTABLE_shimOnConnectSelectAccount: true,
      }),
      walletConnect({
        projectId,
        showQrModal: true,
        metadata: {
          name: 'Tribe Odyssey',
          description: 'Tribe Odyssey - The Expanse',
          url: 'https://tribeodyssey.net',
          icons: ['https://tribeodyssey.net/favicon.ico']
        }
      }),
    ],
    
    // WalletConnect configuration
    walletConnectProjectId: projectId,
  })
)