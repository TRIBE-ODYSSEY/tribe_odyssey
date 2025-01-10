import '@rainbow-me/rainbowkit/styles.css';
import ErrorBoundary from '@src/components/common/errors/ErrorBoundary.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '../index.css';
import App from './AppRoutes.tsx';
import Layout from './components/common/layout/Layout';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createConfig, http } from 'wagmi'
import { mainnet, base } from 'wagmi/chains'

const queryClient = new QueryClient();

// Create wagmi config
const wagmiConfig = createConfig({
  chains: [mainnet, base],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ErrorBoundary>
            <Layout>
              <App />
            </Layout>
          </ErrorBoundary>
        </RainbowKitProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
