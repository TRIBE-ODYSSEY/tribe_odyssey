import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useAccount } from 'wagmi';

import PageLayout from '@src/components/common/layout/PageLayout';
import RafflesOpened from './components/RafflesOpened';
import RaffleDetails from './components/RaffleDetails';
import Winners from './components/Winners';
import RafflesAdmin from './components/RafflesAdmin';

// Define animation variants type
const pageTransition: Variants = {
  initial: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

// Define admin addresses type
type AdminAddresses = readonly string[];

// Define props type for AdminRoute
interface AdminRouteProps {
  element: JSX.Element;
}

const Raffles: React.FC = () => {
  const location = useLocation();
  const { address } = useAccount();
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);

  const ADMIN_ADDRESSES: AdminAddresses = [
    '0xc570F1B8D14971c6cd73eA8db4F7C44E4AAdC6f2',
  ] as const;

  React.useEffect(() => {
    if (address) {
      const isAdminAddress = ADMIN_ADDRESSES
        .map((addr: string) => addr.toLowerCase())
        .includes(address.toLowerCase());
      setIsAdmin(isAdminAddress);
    } else {
      setIsAdmin(false);
    }
  }, [address]);

  const AdminRoute: React.FC<AdminRouteProps> = ({ element }): JSX.Element => {
    if (!isAdmin) {
      return (
        <motion.div
          {...pageTransition}
          className="container mx-auto px-4 py-8"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
            <p className="text-white/60">
              You need admin privileges to access this page.
            </p>
          </div>
        </motion.div>
      );
    }
    return element;
  };

  const MotionWrapper: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => (
    <motion.div {...pageTransition}>
      {children}
    </motion.div>
  );

  return (
    <PageLayout>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
        >
          <Routes>
            {/* Main Raffles List */}
            <Route 
              path="/" 
              element={
                <MotionWrapper>
                  <RafflesOpened />
                </MotionWrapper>
              } 
            />
            
            {/* Individual Raffle Details */}
            <Route 
              path="/:id" 
              element={
                <MotionWrapper>
                  <RaffleDetails />
                </MotionWrapper>
              } 
            />
            
            {/* Winners Gallery */}
            <Route 
              path="/winners" 
              element={
                <MotionWrapper>
                  <Winners />
                </MotionWrapper>
              } 
            />
            
            {/* Admin Panel - Protected Route */}
            <Route 
              path="/admin" 
              element={
                <AdminRoute 
                  element={
                    <MotionWrapper>
                      <RafflesAdmin />
                    </MotionWrapper>
                  } 
                />
              } 
            />

            {/* Catch all route */}
            <Route 
              path="*" 
              element={
                <Navigate 
                  to="/" 
                  replace 
                />
              } 
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </PageLayout>
  );
};

export default Raffles;