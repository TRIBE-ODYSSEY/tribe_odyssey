import { Spinner } from 'flowbite-react';
import React, { Suspense } from 'react';
import AppRoutes from './AppRoutes';
import { WagmiProvider } from 'wagmi';
import { rainbowKitConfig } from './lib/config/rainbowkit';


const App: React.FC = () => {
  return (
    <WagmiProvider config={rainbowKitConfig}>
      <div className="min-h-screen bg-gradient-to-b from-[var(--color-tertiary)] to-[var(--color-background)]">
        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center">
              <Spinner 
                color="warning" 
                aria-label="Loading"
                className="text-[var(--color-button-primary)]" 
              />
            </div>
          }
        >
          <AppRoutes />
        </Suspense>
      </div>
    </WagmiProvider>
  );
};

export default App;