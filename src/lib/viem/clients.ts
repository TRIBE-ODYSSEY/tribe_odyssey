import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(`https://eth-mainnet.g.alchemy.com/v2/gqqtUwI2JkpruEZDNdTi4XJltOUyj4K1`)
});

export type PublicClient = typeof publicClient;

// These functions are now exported from web3React.tsx
export { 
  publicClientToProvider,
  useEthersProvider,
  walletClientToSigner,
  useEthersSigner
} from '@src/utils/web3React';