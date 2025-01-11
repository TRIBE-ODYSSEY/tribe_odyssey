import { type Hash, type Address } from 'viem'
import { walletClient } from '../../viem/clients'
import { mainnet } from 'viem/chains'

export async function sendTransaction(to: Address, value: bigint): Promise<Hash> {
  const [account] = await walletClient.getAddresses()
  
  const hash = await walletClient.sendTransaction({
    account,
    chain: mainnet,
    to,
    value,
  })
  
  return hash
}

export async function signMessage(message: string): Promise<Hash> {
  const [account] = await walletClient.getAddresses()
  
  const signature = await walletClient.signMessage({
    account,
    message,
  })
  
  return signature
}

export async function signTypedData(domain: any, types: any, value: any): Promise<Hash> {
  const [account] = await walletClient.getAddresses()
  
  const signature = await walletClient.signTypedData({
    account,
    domain,
    types,
    primaryType: 'Mail',
    message: value,
  })
  
  return signature
}

export async function getBalance(address: Address): Promise<bigint> {
  const balance = await walletClient.getBalance({ address })
  return balance
}

export async function getChainId(): Promise<number> {
  const chainId = await walletClient.getChainId()
  return chainId
}