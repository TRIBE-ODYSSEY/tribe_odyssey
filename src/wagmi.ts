import { getDefaultConfig, createAuthenticationAdapter } from '@rainbow-me/rainbowkit'
import { http } from 'viem'
import { base, mainnet } from 'wagmi/chains'
import { createSiweMessage } from 'viem/siwe'

// Get WalletConnect Project ID from environment variables
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'e6937fb240cd6f4df6739b75bf0b324d'

// Create authentication adapter
const authenticationAdapter = createAuthenticationAdapter({
  getNonce: async () => {
    const response = await fetch('/api/nonce')
    return await response.text()
  },
  createMessage: ({ nonce, address, chainId }) => {
    return createSiweMessage({
      domain: window.location.host,
      address,
      statement: 'Sign in with Ethereum to Tribe Odyssey',
      uri: window.location.origin,
      version: '1',
      chainId,
      nonce,
    })
  },
  verify: async ({ message, signature }) => {
    const verifyRes = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, signature }),
    })
    return Boolean(verifyRes.ok)
  },
  signOut: async () => {
    await fetch('/api/logout')
  },
})

// Create wagmi config
export const config = getDefaultConfig({
  appName: 'Tribe Odyssey',
  projectId,
  chains: [mainnet, base],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
  ssr: true,
  // Add authentication configuration
  authentication: {
    adapter: authenticationAdapter
  },
})
