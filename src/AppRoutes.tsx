// src/AppRoutes.tsx
import useLazyLoading from '@hooks/useLazyLoading';
import React, { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

// Lazy loaded pages
const HomePage = lazy(() => import('@src/pages/HomePage'));
const HealthChecker = lazy(() => import('@src/pages/health/health_checker'));
const ENSPage = lazy(() => import('@src/pages/Assets/ENS'));
const FourKPage = lazy(() => import('@src/pages/Assets/4kTribe'));
const MoltenPage = lazy(() => import('@src/pages/Assets/Molten'));
const TribalBeatsPage = lazy(() => import('@src/pages/Assets/TribalBeats'));
const Tribal19CheckerPage = lazy(() => import('@src/pages/Assets/Tribal19Checker'));
const CouncilPage = lazy(() => import('@src/pages/Council'));
const RafflesPage = lazy(() => import('@src/pages/Staking/Raffles'));
const StakingApesPage = lazy(() => import('@src/pages/Staking/StakeApes'));
const DropsPage = lazy(() => import('@src/pages/Element19/Drops'));
const CollectionPage = lazy(() => import('@src/pages/Element19/Collection'));
const WallpapersPage = lazy(() => import('@src/pages/Assets/Wallpapers'));
const WinnersPage = lazy(() => import('@src/pages/Staking/Winners'));
const ProfilePage = lazy(() => import('@src/pages/Profile'));
const RafflesAdminPage = lazy(() => import('@src/pages/RafflesAdmin'));
const RaffleDetails = lazy(() => import('@src/pages/Staking/RaffleDetails'));
const NotFoundPage = lazy(() => import('@src/components/common/errors/network/NetworkErrors'));

// Protected Route Component
const ProtectedRoute: React.FC<{ 
  element: React.ReactElement, 
  adminOnly?: boolean,
  allowedAddresses?: string[] 
}> = ({ element, adminOnly, allowedAddresses }) => {
  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && allowedAddresses && !allowedAddresses.includes(address!)) {
    return <Navigate to="/raffles" replace />;
  }

  return element;
};

const AppRoutes: React.FC = () => {
  useLazyLoading();

  const ADMIN_ADDRESSES = [
    '0xc570F1B8D14971c6cd73eA8db4F7C44E4AAdC6f2',
    // Add other admin addresses here
  ];

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/health" element={<HealthChecker />} />
      
      {/* Protected Routes */}
      <Route path="/ens" element={<ProtectedRoute element={<ENSPage />} />} />
      <Route path="/4kTribe" element={<ProtectedRoute element={<FourKPage />} />} />
      <Route path="/molten" element={<ProtectedRoute element={<MoltenPage />} />} />
      <Route path="/tribalbeats" element={<ProtectedRoute element={<TribalBeatsPage />} />} />
      <Route path="/checker" element={<ProtectedRoute element={<Tribal19CheckerPage />} />} />
      <Route path="/council" element={<ProtectedRoute element={<CouncilPage />} />} />
      
      {/* Raffle Routes */}
      <Route path="/raffles" element={<ProtectedRoute element={<RafflesPage />} />} />
      <Route path="/raffles/:id" element={<ProtectedRoute element={<RaffleDetails />} />} />
      <Route 
        path="/raffles/admin" 
        element={
          <ProtectedRoute 
            element={<RafflesAdminPage />} 
            adminOnly 
            allowedAddresses={ADMIN_ADDRESSES} 
          />
        } 
      />
      <Route path="/winners" element={<ProtectedRoute element={<WinnersPage />} />} />
      
      {/* Staking Routes */}
      <Route path="/staking" element={<ProtectedRoute element={<StakingApesPage />} />} />
      
      {/* Element19 Routes */}
      <Route path="/drops" element={<ProtectedRoute element={<DropsPage />} />} />
      <Route path="/collection" element={<ProtectedRoute element={<CollectionPage />} />} />
      
      {/* Asset Routes */}
      <Route path="/wallpapers" element={<ProtectedRoute element={<WallpapersPage />} />} />
      
      {/* User Routes */}
      <Route path="/account" element={<ProtectedRoute element={<ProfilePage />} />} />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
