import { createConfig, http } from 'wagmi'
import { mainnet, goerli } from 'wagmi/chains'
import { getDefaultConfig } from 'connectkit'

export const config = getDefaultConfig({
  chains: [mainnet, goerli],
  transports: {
    [mainnet.id]: http(),
    [goerli.id]: http()
  },
  walletConnectProjectId: process.env.VITE_WALLETCONNECT_PROJECT_ID || 'e6937fb240cd6f4df6739b75bf0b324d',
  appName: 'Tribe Odyssey',
})

  