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
import { config, rainbowConfig } from './wagmi';
import { WagmiConfig } from 'wagmi';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiConfig config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider {...rainbowConfig}>
            <ErrorBoundary>
              <Layout>
                <App />
              </Layout>
            </ErrorBoundary>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiConfig>
    </BrowserRouter>
  </React.StrictMode>
);
