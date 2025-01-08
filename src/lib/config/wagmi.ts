import { createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { connectkit } from '@wagmi/connectors'

export const config = createConfig({
  chains: [mainnet],
  connectors: [
    connectkit()
  ],
  transports: {
    [mainnet.id]: http()
  }
})