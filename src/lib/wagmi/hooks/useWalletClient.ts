import { useWalletClient as useWagmiWalletClient } from 'wagmi'
import { type WalletClient } from 'viem'
import { mainnet } from 'viem/chains'

export function useWalletClient() {
  const { data: walletClient } = useWagmiWalletClient({
    chainId: mainnet.id,
  })

  return walletClient as WalletClient
}

// If you need more specific types:
export type WalletClientType = ReturnType<typeof useWalletClient>