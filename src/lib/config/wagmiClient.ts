import { getDefaultConfig } from 'connectkit';
import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { WALLET_CONNECT_PROJECT_ID } from './constants';


export const config = createConfig(
  getDefaultConfig({
    appName:"Tribe Odyssey",
    walletConnectProjectId: WALLET_CONNECT_PROJECT_ID,
    chains: [mainnet, sepolia],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
  },
})
);