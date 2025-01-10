import { Spinner } from 'flowbite-react';
import React, { Suspense } from 'react';
import AppRoutes from './AppRoutes';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const App: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Spinner color="warning" aria-label="Loading" />
        </div>
      }
    >
      <AppRoutes />
      <ConnectButton />
    </Suspense>
  );
};

export default App;