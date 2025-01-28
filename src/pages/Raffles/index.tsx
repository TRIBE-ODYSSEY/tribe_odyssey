import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageLayout from '@src/components/common/layout/PageLayout';
import { useRaffleContext } from './context/RaffleContext';

// Components
import RafflesOpened from './components/RafflesOpened';
import RaffleDetails from './components/RaffleDetails';
import Winners from './components/Winners';
import RafflesAdmin from './admin';


const Raffles: React.FC = () => {
  const location = useLocation();
  const { isAdmin } = useRaffleContext();

  const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
    if (!isAdmin) {
      return <Navigate to="/raffles" replace />;
    }
    return element;
  };

  return (
    <PageLayout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<RafflesOpened />} />
          <Route path="/winners" element={<Winners />} />
          <Route path="/:id" element={<RaffleDetails />} />
          <Route 
            path="/admin/*" 
            element={<ProtectedRoute element={<RafflesAdmin />} />} 
          />
          <Route path="*" element={<Navigate to="/raffles" replace />} />
        </Routes>
      </AnimatePresence>
    </PageLayout>
  );
};

export default Raffles;