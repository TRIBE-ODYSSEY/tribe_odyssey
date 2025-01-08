import { Address } from 'viem'

export const STAKING_CONTRACT_ADDRESS = import.meta.env.VITE_STAKING_CONTRACT as Address
export const TRIBE_CONTRACT_ADDRESS = import.meta.env.VITE_TRIBE_CONTRACT as Address
export const MULTICALL_CONTRACT_ADDRESS = import.meta.env.VITE_MULTICALL_CONTRACT as Address
export const ENS_REGISTRAR_CONTRACT_ADDRESS = import.meta.env.VITE_ENS_REGISTRAR_CONTRACT as Address

// Optional: Add testnet address if needed
export const STAKING_CONTRACT_ADDRESS_TESTNET = import.meta.env.VITE_STAKING_CONTRACT_TESTNET as Address

// Helper function to get the correct address based on chain
export const getContractAddress = (chainId: number) => {
  return chainId === 1 ? STAKING_CONTRACT_ADDRESS : STAKING_CONTRACT_ADDRESS_TESTNET
}