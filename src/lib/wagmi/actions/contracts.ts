import { type Address, type Hash } from 'viem'
import { publicClient, walletClient } from '../../viem/clients'
import { erc20ABI } from '@src/lib/config/abi/erc20.json'
import { erc721ABI } from '@src/lib/config/abi/erc721.json'
import { stakingABI } from '@src/lib/config/abi/staking.json'
import { tribeABI } from '@src/lib/config/abi/tribe.json'
import { multicallABI } from '@src/lib/config/abi/multicall.json'
import { EthRegistrarSubdomainRegistrarABI } from '@src/lib/config/abi/EthRegistrarSubdomainRegistrar.json'

// Contract type mapping
export type ContractName = 
  | 'erc20'
  | 'erc721'
  | 'staking'
  | 'tribe'
  | 'multicall'
  | 'ethRegistrarSubdomainRegistrar'

// ABI mapping
const abiMap = {
  erc20: erc20ABI,
  erc721: erc721ABI,
  staking: stakingABI,
  tribe: tribeABI,
  multicall: multicallABI,
  ethRegistrarSubdomainRegistrar: EthRegistrarSubdomainRegistrarABI,
} as const

export async function readContract(
  address: Address,
  contractName: ContractName,
  functionName: string,
  args: unknown[]
) {
  const data = await publicClient.readContract({
    address,
    abi: abiMap[contractName],
    functionName,
    args,
  })
  return data
}

export async function writeContract(
  address: Address,
  contractName: ContractName,
  functionName: string,
  args: unknown[]
): Promise<Hash> {
  const hash = await walletClient.writeContract({
    address,
    abi: abiMap[contractName],
    functionName,
    args,
    account: walletClient.account,
  })
  return hash
}