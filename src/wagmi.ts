
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base, mainnet } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Tribe Odyssey',
  projectId: 'e6937fb240cd6f4df6739b75bf0b324d',
  chains: [mainnet, base],
});
