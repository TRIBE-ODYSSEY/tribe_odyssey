import { createPublicClient, http, type PublicClient, type WalletClient } from 'viem'
import { getContractInstance } from 'wagmi/actions'
import { mainnet } from 'wagmi/chains'

// Import ABIs
import MulticallABI from '../config/abi/Multicall.json'
import TribeABI from '../config/abi/tribe.json'
import ApeABI from '../config/abi/erc721.json'
import ERC20ABI from '../config/abi/erc20.json'
import StakingABI from '../config/abi/staking.json'
import EnsRegistrarABI from '../config/abi/EthRegistrarSubdomainRegistrar.json'

import {
  getApeAddress,
  getEnsRegistrarAddress,
  getMulticallAddress,
  getStakingAddress,
  getTribeAddress,
  isZeroAddress,
} from "./addressHelpers"
import getNodeUrl from "./getRcpUrl"
import { getMerkleProof } from "./merkle"
import axios from "axios"

// Create public client for read operations
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(getNodeUrl())
})
  
// Contract getter function
export const getContractInstance = (
  address: string, 
  abi: any[], 
  client: PublicClient | WalletClient
) => {
  return getContractInstance({
    address,
    abi,
    publicClient: client as PublicClient,
    walletClient: client as WalletClient
  })
}

// Contract getters
export const getMulticallContract = (client: PublicClient | WalletClient) => {
  return getContractInstance(getMulticallAddress(), MulticallABI, client)
}

export const getTribeContract = (client: PublicClient | WalletClient) => {
  return getContractInstance(getTribeAddress(), TribeABI, client)
}

export const getApeContract = (client: PublicClient | WalletClient) => {
  return getContractInstance(getApeAddress(), ApeABI, client)
}

export const getTokenContract = (tokenAddress: string, client: PublicClient | WalletClient) => {
  return getContractInstance(tokenAddress, ERC20ABI, client)
}

export const getStakingContract = (client: PublicClient | WalletClient) => {
  return getContractInstance(getStakingAddress(), StakingABI, client)
}

export const getEnsRegistrarContract = (client: PublicClient | WalletClient) => {
  return getContractInstance(getEnsRegistrarAddress(), EnsRegistrarABI, client)
}
