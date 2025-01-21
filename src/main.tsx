import '@rainbow-me/rainbowkit/styles.css';
import ErrorBoundary from '@src/components/common/errors/ErrorBoundary.tsx';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '../index.css';
import App from './AppRoutes.tsx';
import Layout from './components/common/layout/Layout';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { 
  RainbowKitProvider, 
  darkTheme,
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
  getDefaultWallets
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { config } from '@src/lib/wagmi/config';
import { createSiweMessage } from 'viem/siwe';
import { useAuthStore } from '@src/lib/store/authStore';
import { authService } from '@src/lib/services/authService';
// Create authentication adapter
const authenticationAdapter = createAuthenticationAdapter({
  getNonce: async () => {
    return await authService.getNonce();
  },

  createMessage: ({ nonce, address, chainId }) => {
    return createSiweMessage({
      domain: window.location.host,
      address,
      statement: 'Sign in to Tribe Odyssey.',
      uri: window.location.origin,
      version: '1',
      chainId,
      nonce,
      resources: [window.location.origin],
    });
  },

  verify: async ({ message, signature }) => {
    return await authService.verify(message, signature);
  },

  signOut: async () => {
    await authService.logout();
  },
});

// Create Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
});

const { wallets } = getDefaultWallets({
  appName: 'Tribe Odyssey',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || ''
});

// Main App Component
const MainApp = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  return (
    <React.StrictMode>
      <BrowserRouter>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitAuthenticationProvider
              adapter={authenticationAdapter}
              status={isAuthenticated ? 'authenticated' : 'unauthenticated'}
            >
              <RainbowKitProvider
                theme={darkTheme({
                  accentColor: 'var(--color-button-primary)',
                  accentColorForeground: 'var(--color-text-on-primary)',
                  borderRadius: 'medium',
                  fontStack: 'system',
                  overlayBlur: 'small',
                })}
                appInfo={{
                  appName: 'Tribe Odyssey',
                  learnMoreUrl: 'https://tribeodyssey.net',
                }}
              >
                <ErrorBoundary>
                  <Layout>
                    <App />
                  </Layout>
                </ErrorBoundary>
              </RainbowKitProvider>
            </RainbowKitAuthenticationProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

// Render the app
ReactDOM.createRoot(document.getElementById('root')!).render(<MainApp />);
