import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'wagmi/chains';
import { http } from 'wagmi';

export const rainbowKitConfig = getDefaultConfig({
  appName: 'Tribe Odyssey',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || "e6937fb240cd6f4df6739b75bf0b324d",
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/gqqtUwI2JkpruEZDNdTi4XJltOUyj4K1`),
    [sepolia.id]: http()
  },
  ssr: false
}); 