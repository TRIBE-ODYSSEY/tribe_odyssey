import { Spinner } from 'flowbite-react';
import React, { Suspense } from 'react';
import AppRoutes from './AppRoutes';
import { ConnectKitProvider, SIWEProvider } from 'connectkit';
import type { SIWEConfig, SIWESession } from 'connectkit';
import axios from 'axios';
import { AuthProvider } from './lib/contexts/AuthContext';

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
    return response.data as SIWESession;
  },
  signOut: async () => {
    await axios.post('/api/auth/signout');
    return true; // Return boolean to match expected return type
  }
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="">
            <Spinner color="warning" aria-label="Info spinner example" />
          </div>
        }
      >
        <ConnectKitProvider
          theme="auto"
          mode="light"
          options={{
            language: 'en-US',
            overlayBlur: 0
          }}
        >
          <SIWEProvider {...siweConfig}>
            <AppRoutes />
          </SIWEProvider>
        </ConnectKitProvider>
      </Suspense>
    </AuthProvider>
  );
};

export default App;