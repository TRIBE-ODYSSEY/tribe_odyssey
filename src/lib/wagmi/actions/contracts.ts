import type { Address } from 'viem'
import { ethers } from 'ethers';
import erc20ABI from '@src/lib/config/abi/erc20.json'
import erc721ABI from '@src/lib/config/abi/erc721.json'
import stakingABI from '@src/lib/config/abi/staking.json'
import tribeABI from '@src/lib/config/abi/tribe.json'
import EthRegistrarSubdomainRegistrarABI from '@src/lib/config/abi/EthRegistrarSubdomainRegistrar.json'
import { useAlchemy } from '@src/lib/hooks/useAlchemy';

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
    const provider = await useAlchemy().getProvider();
    const contract = new ethers.Contract(
      address,
      abiMap[contractName],
      provider
    );
    
    return await contract[functionName](...args);
  } catch (error) {
    console.error('Contract read error:', error);
    throw error;
  }
}

export async function writeContract(
  address: Address,
  contractName: ContractName,
  functionName: string,
  args: unknown[]
) {
  try {
    const provider = await useAlchemy().getProvider();
    const signer = await useAlchemy().getSigner();
    const contract = new ethers.Contract(
      address,
      abiMap[contractName],
      provider
    ).connect(signer);
    
    const tx = await contract[functionName as keyof typeof contract](...args);
    return await tx.wait();
  } catch (error) {
    console.error('Contract write error:', error);
    throw error;
  }
}