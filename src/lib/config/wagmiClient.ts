import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { getDefaultConfig } from 'connectkit';
import { WALLET_CONNECT_PROJECT_ID } from './constants';


export const config = createConfig(
  getDefaultConfig({
    appName:"Tribe Odyssey",
    walletConnectProjectId: WALLET_CONNECT_PROJECT_ID,
    chains: [mainnet, sepolia],
    transports: {
      [mainnet.id]: http(),//TODO: base chain 
      [sepolia.id]: http(),
  },
})
);