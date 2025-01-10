import { Spinner } from 'flowbite-react';
import React, { Suspense } from 'react';
import AppRoutes from './AppRoutes';

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
    </Suspense>
  );
};

export default App;