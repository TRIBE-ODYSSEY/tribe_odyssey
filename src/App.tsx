import { Spinner } from 'flowbite-react';
import React, { Suspense } from 'react';
import AppRoutes from './AppRoutes';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { config } from './wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center">
              <Spinner color="warning" aria-label="Loading" />
            </div>
          }
        >
          <RainbowKitProvider>
            <AppRoutes />
          </RainbowKitProvider>
        </Suspense>
      </QueryClientProvider>
    </WagmiConfig>
  );
};

export default App;