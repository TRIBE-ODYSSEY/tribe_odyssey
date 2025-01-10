import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import stakingAbi from './src/lib/config/abi/staking.json'
import tribeAbi from './src/lib/config/abi/tribe.json'
import multicallAbi from './src/lib/config/abi/multicall.json'
import ensRegistrarAbi from './src/lib/config/abi/EthRegistrarSubdomainRegistrar.json'
import { erc20Abi } from 'viem'

// Hardcoded addresses for development
const ADDRESSES = {
  STAKING: {
    1: '0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F', // Replace with your mainnet address
    5: '0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB'  // Replace with your testnet address
  },
  TRIBE: {
    1: '0x77F649385cA963859693C3d3299D36dfC7324EB9'  // Replace with your mainnet address
  },
  MULTICALL: {
    1: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441'  // Replace with your mainnet address
  },
  ENS_REGISTRAR: {
    1: '0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB'  // Replace with your mainnet address
  }
} as const

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'Staking',
      address: ADDRESSES.STAKING,
      abi: stakingAbi,
    },
    {
      name: 'Tribe',
      address: ADDRESSES.TRIBE,
      abi: tribeAbi,
    },
    {
      name: 'Multicall',
      address: ADDRESSES.MULTICALL,
      abi: multicallAbi,
    },
    {
      name: 'ENSRegistrar',
      address: ADDRESSES.ENS_REGISTRAR,
      abi: ensRegistrarAbi,
    },
    {
      name: 'ERC20',
      abi: erc20Abi,
    }
  ],
  plugins: [react()],
})