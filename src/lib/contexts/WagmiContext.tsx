import { WagmiProvider } from 'wagmi'
import { config } from '@src/lib/config/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider, SIWEProvider } from 'connectkit'
import type { SIWEConfig } from 'connectkit'
import axios from 'axios'

const queryClient = new QueryClient()

const siweConfig: SIWEConfig = {
  getNonce: async () => {
    const response = await axios.get('/api/auth/nonce')
    return response.data.nonce
  },
  createMessage: ({ nonce }) => {
    return `Sign in with Ethereum\n\nNonce: ${nonce}`
  },
  verifyMessage: async ({ message, signature }) => {
    const response = await axios.post('/api/auth/verify', {
      message,
      signature,
    })
    return response.data
  },
  getSession: async () => {
    const response = await axios.get('/api/auth/session')
    return response.data
  },
  signOut: async () => {
    await axios.post('/api/auth/signout')
    return true
  }
}

export function WagmiContext({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          theme="auto"
          mode="light"
          options={{
            language: 'en-US',
            overlayBlur: 0
          }}
        >
          <SIWEProvider {...siweConfig}>
            {children}
          </SIWEProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
