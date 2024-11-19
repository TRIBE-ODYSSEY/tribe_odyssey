import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, goerli } from 'wagmi/chains';
import { http } from 'viem';

const projectId = import.meta.env.VITE_PROJECT_ID;

if (!projectId) {
  throw new Error('Missing VITE_PROJECT_ID');
}

export const wagmiConfig = getDefaultConfig({
  appName: 'Tribe',
  projectId,
  chains: [mainnet, goerli],
  transports: {
    [mainnet.id]: http(),
    [goerli.id]: http(),
  },
}); 