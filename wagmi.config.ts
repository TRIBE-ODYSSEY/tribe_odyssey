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

// Contract addresses configuration from environment variables
const ADDRESSES = {
  STAKING: {
    1: import.meta.env.VITE_STAKING_CONTRACT_MAINNET,
    5: import.meta.env.VITE_STAKING_CONTRACT_GOERLI
  },
  TRIBE: {
    1: import.meta.env.VITE_TRIBE_CONTRACT_MAINNET
  },
  MULTICALL: {
    1: import.meta.env.VITE_MULTICALL_CONTRACT_MAINNET
  },
  ENS_REGISTRAR: {
    1: import.meta.env.VITE_ENS_REGISTRAR_CONTRACT_MAINNET
  }
} as const

// Validate required environment variables
const requiredEnvVars = [
  'VITE_STAKING_CONTRACT_MAINNET',
  'VITE_STAKING_CONTRACT_GOERLI',
  'VITE_TRIBE_CONTRACT_MAINNET',
  'VITE_MULTICALL_CONTRACT_MAINNET',
  'VITE_ENS_REGISTRAR_CONTRACT_MAINNET'
]

requiredEnvVars.forEach(envVar => {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
})

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