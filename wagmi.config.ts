import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import { erc20Abi } from 'viem'
import type { Abi } from 'viem'

// Import and assert types for the JSON ABIs
import stakingAbiJson from './src/lib/config/abi/staking.json'
import tribeAbiJson from './src/lib/config/abi/tribe.json'
import multicallAbiJson from './src/lib/config/abi/multicall.json'
import ensRegistrarAbiJson from './src/lib/config/abi/EthRegistrarSubdomainRegistrar.json'

// Type assertions for the imported ABIs
const stakingAbi = stakingAbiJson as Abi
const tribeAbi = tribeAbiJson as Abi
const multicallAbi = multicallAbiJson as Abi
const ensRegistrarAbi = ensRegistrarAbiJson as Abi

// Contract addresses configuration
const ADDRESSES = {
  STAKING: {
    1: '0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F', // Mainnet
    5: '0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB'  // Goerli
  },
  TRIBE: {
    1: '0x77F649385cA963859693C3d3299D36dfC7324EB9'
  },
  MULTICALL: {
    1: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441'
  },
  ENS_REGISTRAR: {
    1: '0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB'
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