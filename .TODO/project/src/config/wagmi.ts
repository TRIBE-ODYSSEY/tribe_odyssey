import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { getDefaultConfig } from 'connectkit';
import { WALLET_CONNECT_PROJECT_ID } from './constants';

export const config = createConfig(
  getDefaultConfig({
    appName: 'NFT Staking dApp',
    walletConnectProjectId: WALLET_CONNECT_PROJECT_ID,
    chains: [mainnet, sepolia],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  })
);