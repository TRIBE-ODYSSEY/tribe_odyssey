import { Spinner } from 'flowbite-react';
import React, { Suspense } from 'react';
import AppRoutes from './AppRoutes';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { AuthProvider } from './lib/contexts/AuthContext';

const App: React.FC = () => {
  const auth = AuthProvider({ children: null });
  
  return (
    <auth.Provider value={auth.value}>
      <Suspense
        fallback={
          <div className="">
            <Spinner color="warning" aria-label="Info spinner example" />
          </div>
        }
      >
        <RainbowKitProvider>
          <AppRoutes />
        </RainbowKitProvider>
      </Suspense>
    </auth.Provider>
  );
};

export default App;