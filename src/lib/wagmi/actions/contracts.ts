import { type Address, type Hash } from 'viem'
import { publicClient, walletClient } from '../../viem/clients'
import { contractABI } from '../abis'

export async function readContract(
  address: Address,
  functionName: string,
  args: unknown[]
) {
  const data = await publicClient.readContract({
    address,
    abi: contractABI,
    functionName,
    args,
  })
  return data
}

export async function writeContract(
  address: Address,
  functionName: string,
  args: unknown[]
): Promise<Hash> {
  const hash = await walletClient.writeContract({
    address,
    abi: contractABI,
    functionName,
    args,
  })
  return hash
}