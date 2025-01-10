import { Spinner } from 'flowbite-react';
import React, { Suspense } from 'react';
import AppRoutes from './AppRoutes';
import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from './wagmi';


const App: React.FC = () => {
  return (
    <WagmiConfig config={config}>
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
    </WagmiConfig>
  );
};

export default App;