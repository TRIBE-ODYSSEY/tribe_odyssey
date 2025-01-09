import { createConfig, http } from 'wagmi'
import { mainnet, goerli } from 'wagmi/chains'
import { connectkit } from 'connectkit'

export const config = createConfig({
  chains: [mainnet, goerli],
  connectors: [
    connectkit({
      options: {
        walletConnectProjectId: process.env.VITE_WALLETCONNECT_PROJECT_ID || 'e6937fb240cd6f4df6739b75bf0b324d',
      }
    })
  ],
  transports: {
    [mainnet.id]: http(),
    [goerli.id]: http()
  }
})

  