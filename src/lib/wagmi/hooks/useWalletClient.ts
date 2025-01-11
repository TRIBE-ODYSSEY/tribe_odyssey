import { useWalletClient as useWagmiWalletClient } from 'wagmi'
import { WalletClient } from '../../viem/clients'

export function useWalletClient() {
  const { data: walletClient } = useWagmiWalletClient()
  return walletClient as WalletClient
}