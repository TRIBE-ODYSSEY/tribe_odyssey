import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'wagmi/chains';
import { http } from 'wagmi';
import { injectedWallet } from '@rainbow-me/rainbowkit/wallets';

const ALCHEMY_KEY = import.meta.env.VITE_ALCHEMY_KEY;
const WALLET_CONNECT_ID = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

if (!ALCHEMY_KEY || !WALLET_CONNECT_ID) {
  throw new Error('Missing required environment variables');
}

export const rainbowKitConfig = getDefaultConfig({
  appName: 'Tribe Odyssey',
  projectId: WALLET_CONNECT_ID,
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`),
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_KEY}`)
  },
  ssr: false,
  wallets: [{ groupName: 'Popular', wallets: [injectedWallet] }]
}); 