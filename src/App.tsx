import { Spinner } from 'flowbite-react';
import React, { Suspense } from 'react';
import AppRoutes from './AppRoutes';
import { ConnectKitProvider, SIWEProvider } from 'connectkit';
import type { SIWEConfig, SIWESession } from 'connectkit';
import axios from 'axios';
import { AuthProvider } from './lib/context/AuthContext';

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
  }
};

const App: React.FC = () => {
  return (
    <AuthProvider.Provider value={AuthProvider.value}>
      <Suspense
        fallback={
          <div className="">
            <Spinner color="warning" aria-label="Info spinner example" />
          </div>
        }
      >
        <ConnectKitProvider options={{
          customTheme: {mode: 'light', accentColor: '#000000', accentColorForeground: '#ffffff'}, // Define theme object or import it
          language: 'en-US',
        }}>
          <SIWEProvider {...siweConfig}>
            <AppRoutes />
          </SIWEProvider>
        </ConnectKitProvider>
      </Suspense>
    </AuthProvider.Provider>
  );
};

export default App;