import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';
import PageLayout from '@src/components/common/layout/PageLayout';

// Components
import RafflesOpened from './components/RafflesOpened';
import RaffleDetails from './components/RaffleDetails';
import Winners from './components/Winners';
import RafflesAdmin from './components/RafflesAdmin';

// Constants
const ADMIN_ADDRESSES = [
  '0xc570F1B8D14971c6cd73eA8db4F7C44E4AAdC6f2',
  '0xf7D579d80C6e01382D7BAa122B78310361122B5b'
].map(addr => addr.toLowerCase());

const Raffles: React.FC = () => {
  const location = useLocation();
  const { address } = useAccount();
  const isAdmin = address && ADMIN_ADDRESSES.includes(address.toLowerCase());

  const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
    if (!isAdmin) {
      return <Navigate to="/" replace />;
    }
    return element;
  };

  return (
    <PageLayout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<RafflesOpened />} />
          <Route path="/:id" element={<RaffleDetails />} />
          <Route path="/winners" element={<Winners />} />
          <Route 
            path="/admin" 
            element={<ProtectedRoute element={<RafflesAdmin />} />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </PageLayout>
  );
};

export default Raffles;