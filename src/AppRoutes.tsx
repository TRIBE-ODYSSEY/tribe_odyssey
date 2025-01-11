// src/AppRoutes.tsx
import useLazyLoading from '@hooks/useLazyLoading';
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

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

const AppRoutes: React.FC = () => {
  useLazyLoading();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/health" element={<HealthChecker />} />
      <Route path="/ens" element={<ENSPage />} />
      <Route path="/4kTribe" element={<FourKPage />} />
      <Route path="/molten" element={<MoltenPage />} />
      <Route path="/tribalbeats" element={<TribalBeatsPage />} />
      <Route path="/checker" element={<Tribal19CheckerPage />} />
      <Route path="/council" element={<CouncilPage />} />
      
      {/* Raffle Routes */}
      <Route path="/raffles" element={<RafflesPage />} />
      <Route path="/raffles/:id" element={<RaffleDetails />} />
      <Route path="/raffles/admin" element={<RafflesAdminPage />} />
      <Route path="/winners" element={<WinnersPage />} />
      
      {/* Staking Routes */}
      <Route path="/staking" element={<StakingApesPage />} />
      
      {/* Element19 Routes */}
      <Route path="/drops" element={<DropsPage />} />
      <Route path="/collection" element={<CollectionPage />} />
      
      {/* Asset Routes */}
      <Route path="/wallpapers" element={<WallpapersPage />} />
      
      {/* User Routes */}
      <Route path="/account" element={<ProfilePage />} />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
