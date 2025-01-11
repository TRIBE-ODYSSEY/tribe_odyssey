import { type Hash, type Address } from 'viem'
import { walletClient } from '../../viem/clients'

export async function sendTransaction(to: Address, value: bigint): Promise<Hash> {
  const hash = await walletClient.sendTransaction({
    to,
    value,
  })
  return hash
}

export async function signMessage(message: string): Promise<Hash> {
  const signature = await walletClient.signMessage({
    message,
  })
  return signature
}