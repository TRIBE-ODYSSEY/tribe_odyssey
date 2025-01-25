import { Spinner } from 'flowbite-react';
import React, { Suspense } from 'react';
import AppRoutes from './AppRoutes';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default App;