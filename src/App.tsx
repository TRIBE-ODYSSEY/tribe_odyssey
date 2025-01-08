import { Spinner } from 'flowbite-react';
import React, { Suspense } from 'react';
import AppRoutes from './AppRoutes';
import { WagmiProvider } from 'wagmi';
import { config } from '@src/lib/config/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './lib/contexts/AuthContext';
import { RefreshContextProvider } from './lib/contexts/RefreshContext';
import { ConnectKitProvider, SIWEProvider } from 'connectkit';
import type { SIWEConfig } from 'connectkit';
import axios from 'axios';

const queryClient = new QueryClient();

const siweConfig: SIWEConfig = {
  getNonce: async () => {
    const response = await axios.get('/api/auth/nonce');
    return response.data.nonce;
  },
  createMessage: ({ nonce }) => {
    return `Sign in with Ethereum\n\nNonce: ${nonce}`;
  },
  verifyMessage: async ({ message, signature }) => {
    const response = await axios.post('/api/auth/verify', {
      message,
      signature,
    });
    return response.data;
  },
  getSession: async () => {
    const response = await axios.get('/api/auth/session');
    return response.data;
  },
  signOut: async () => {
    await axios.post('/api/auth/signout');
    return true;
  }
};

const App = () => {
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
            <AuthProvider>
              <RefreshContextProvider>
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-screen">
                      <Spinner color="warning" aria-label="Loading..." />
                    </div>
                  }
                >
                  <AppRoutes />
                </Suspense>
              </RefreshContextProvider>
            </AuthProvider>
          </SIWEProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;