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
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { config } from '@src/lib/wagmi/config';
import { useAuthStore } from '@src/lib/store/authStore';
import { authService } from '@src/lib/services/authService';

const authenticationAdapter = createAuthenticationAdapter({
  getNonce: async () => {
    return await authService.getNonce();
  },

  createMessage: ({ nonce, address, chainId }) => {
    return {
      domain: window.location.host,
      address,
      statement: 'Sign in to Tribe Odyssey.',
      uri: window.location.origin,
      version: '1',
      chainId,
      nonce,
    };
  },

  verify: async ({ message, signature }) => {
    return await authService.verify(message, signature);
  },

  signOut: async () => {
    await authService.logout();
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
});

const MainApp = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  useEffect(() => {
    if (isAuthenticated) {
      authService.getAuthStatus();
    }
  }, [isAuthenticated]);

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

ReactDOM.createRoot(document.getElementById('root')!).render(<MainApp />);
