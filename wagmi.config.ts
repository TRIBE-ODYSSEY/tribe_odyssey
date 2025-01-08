import { defineConfig } from '@wagmi/cli'
import { react, actions } from '@wagmi/cli/plugins'
import { mainnet, sepolia } from 'wagmi/chains'

// Import JSON files directly
import ERC20ABI from '@src/lib/config/abi/erc20.json'
import MulticallABI from "@src/lib/config/abi/multicall.json"
import TribeABI from "@src/lib/config/abi/tribe.json"
import StakingABI from "@src/lib/config/abi/staking.json"

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'Tribe',
      abi: TribeABI,
      address: {
        [mainnet.id]: '0x77F649385cA963859693C3d3299D36dfC7324EB9',
        [sepolia.id]: '0x8371D5E26A6E86beE233482F1D71C0c6c86972D1',
      },
    },
    {
      name: 'Staking',
      abi: StakingABI,
      address: {
        [mainnet.id]: '0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F',
        [sepolia.id]: '0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB',
      },
    },
    {
      name: 'Multicall',
      abi: MulticallABI,
      address: {
        [mainnet.id]: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
        [sepolia.id]: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
      },
    },
    {
      name: 'ERC20',
      abi: ERC20ABI,
    },
  ],
  plugins: [
    actions(),
    react(),
  ],
})