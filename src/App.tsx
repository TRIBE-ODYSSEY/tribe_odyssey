import { Spinner } from 'flowbite-react';
import React, { Suspense } from 'react';
import AppRoutes from './AppRoutes';

const App: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="">
          <Spinner color="warning" aria-label="Info spinner example" />
        </div>
      }
    >
      <AppRoutes />
    </Suspense>
  );
};

export default App;
