import { Spinner } from 'flowbite-react';
import React, { Suspense } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import AppRoutes from './AppRoutes';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  // Use isConnected to conditionally render content
  React.useEffect(() => {
    if (!isConnected) {
      navigate('/'); // Redirect to home if not connected
    }
  }, [isConnected, navigate]);


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="fixed top-4 right-4 z-50">
        <ConnectButton />
      </div>
      
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <Spinner color="warning" aria-label="Loading" />
          </div>
        }
      >
        <AppRoutes />
      </Suspense>
    </div>
  );
};

export default App;