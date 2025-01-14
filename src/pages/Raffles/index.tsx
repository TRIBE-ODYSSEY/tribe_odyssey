import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import PageLayout from '@src/components/common/layout/PageLayout';
import RafflesOpened from './components/RafflesOpened';
import RaffleDetails from './components/RaffleDetails';
import Winners from './components/Winners';
import RafflesAdmin from './components/RafflesAdmin';
import { useAccount } from 'wagmi';

const Raffles: React.FC = () => {
  const location = useLocation();
  const { address } = useAccount();
  const [isAdmin, setIsAdmin] = useState(false);

  const ADMIN_ADDRESSES = [
    '0xc570F1B8D14971c6cd73eA8db4F7C44E4AAdC6f2',
  ];

  useEffect(() => {
    if (address) {
      setIsAdmin(ADMIN_ADDRESSES.map(addr => addr.toLowerCase())
        .includes(address.toLowerCase()));
    }
  }, [address]);

  return (
    <PageLayout>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <Routes>
            {/* Main Raffles List */}
            <Route path="/" element={<RafflesOpened />} />
            
            {/* Individual Raffle Details */}
            <Route path="/:id" element={<RaffleDetails />} />
            
            {/* Winners Gallery */}
            <Route path="/winners" element={<Winners />} />
            
            {/* Admin Panel - Protected Route */}
            <Route 
              path="/admin" 
              element={
                isAdmin ? (
                  <RafflesAdmin />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="container mx-auto px-4 py-8"
                  >
                    <div className="text-center text-white/60">
                      Access Denied. Admin privileges required.
                    </div>
                  </motion.div>
                )
              } 
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </PageLayout>
  );
};

export default Raffles;