import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'
import { getDefaultConfig } from "connectkit";

// Your WalletConnect project ID
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID

export const config = createConfig(
  getDefaultConfig({
    appName: 'Tribe Odyssey',
    appIcon: 'https://tribeodyssey.com/favicon.ico',
    appDescription: 'Tribe Odyssey - The Expanse',
    appUrl: 'https://tribeodyssey.com',
    chains: [mainnet, sepolia],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
    connectors: [
      injected(),
      metaMask(),
      walletConnect({ projectId }),
    ],
    walletConnectProjectId: projectId,
  })
)