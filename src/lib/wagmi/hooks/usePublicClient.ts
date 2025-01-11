import { usePublicClient as useWagmiPublicClient } from 'wagmi'
import { PublicClient } from '../../viem/clients'

export function usePublicClient() {
  const publicClient = useWagmiPublicClient()
  return publicClient as PublicClient
}