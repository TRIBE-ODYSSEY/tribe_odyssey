import type { Address } from 'viem'
import { erc20ABI } from '@src/lib/config/abi/erc20.json'
import { erc721ABI } from '@src/lib/config/abi/erc721.json'
import { stakingABI } from '@src/lib/config/abi/staking.json'
import { tribeABI } from '@src/lib/config/abi/tribe.json'
import { EthRegistrarSubdomainRegistrarABI } from '@src/lib/config/abi/EthRegistrarSubdomainRegistrar.json'
import { alchemy } from '@src/lib/config/alchemy'
import { encodeAbiParameters } from 'viem'

// Contract type mapping
export type ContractName = 
  | 'erc20'
  | 'erc721'
  | 'staking'
  | 'tribe'
  | 'ethRegistrarSubdomainRegistrar'

// ABI mapping
const abiMap = {
  erc20: erc20ABI,
  erc721: erc721ABI,
  staking: stakingABI,
  tribe: tribeABI,
  ethRegistrarSubdomainRegistrar: EthRegistrarSubdomainRegistrarABI,
} as const

export async function readContract(
  address: Address,
  contractName: ContractName,
  functionName: string,
  args: unknown[]
) {
  try {
    const data = await alchemy.core.call({
      to: address,
      data: encodeAbiParameters(
        abiMap[contractName],
        functionName,
        args
      )
    });
    return data;
  } catch (error) {
    console.error('Contract read error:', error);
    throw error;
  }
}