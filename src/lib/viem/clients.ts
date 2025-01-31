import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(`https://eth-mainnet.g.alchemy.com/v2/97aaa529a475dbc710bcd39b83954cfe`)
});

export type PublicClient = typeof publicClient;

// These functions are now exported from web3React.tsx
export { 
  publicClientToProvider,
  useEthersProvider,
  walletClientToSigner,
  useEthersSigner
} from '@src/utils/web3React';