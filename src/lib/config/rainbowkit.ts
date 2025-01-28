import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'wagmi/chains';
import { http } from 'wagmi';
import { fallback } from 'viem';

export const rainbowKitConfig = getDefaultConfig({
  appName: 'Tribe Odyssey',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: fallback([
      http(`https://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`),
      http()
    ]),
    [sepolia.id]: fallback([
      http(`https://eth-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`),
      http()
    ])
  },
  ssr: false
}); 