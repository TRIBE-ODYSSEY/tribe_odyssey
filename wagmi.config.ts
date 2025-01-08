import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'Staking',
      address: {
        1: process.env.VITE_STAKING_CONTRACT,
        5: process.env.VITE_STAKING_CONTRACT_TESTNET,
      },
      abi: '@src/lib/config/abi/staking.json',
    },
    {
      name: 'Tribe',
      address: {
        1: process.env.VITE_TRIBE_CONTRACT,
      },
      abi: '@src/lib/config/abi/tribe.json',
    },
    {
      name: 'Multicall',
      address: {
        1: process.env.VITE_MULTICALL_CONTRACT,
      },
      abi: '@src/lib/config/abi/multicall.json',
    },
    {
      name: 'ENSRegistrar',
      address: {
        1: process.env.VITE_ENS_REGISTRAR_CONTRACT,
      },
      abi: '@src/lib/config/abi/EthRegistrarSubdomainRegistrar.json',
    },
  ],
  plugins: [react()],
})