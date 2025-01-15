// src/AppRoutes.tsx
import useLazyLoading from '@hooks/useLazyLoading';
import React, { lazy } from 'react';
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
const RafflesPage = lazy(() => import('@src/pages/Raffles'));
const StakingApesPage = lazy(() => import('@src/pages/Staking/StakeApes'));
const DropsPage = lazy(() => import('@src/pages/Element19/Drops'));
const CollectionPage = lazy(() => import('@src/pages/Element19/Collection'));
const WallpapersPage = lazy(() => import('@src/pages/Assets/Wallpapers'));
const ProfilePage = lazy(() => import('@src/pages/Profile'));
const NetworkErrors = lazy(() => import('@src/components/common/errors/network/NetworkErrors'));

const AppRoutes: React.FC = () => {
  useLazyLoading();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/health" element={<HealthChecker />} />
      <Route path="/4kTribe" element={<FourKPage />} />
      <Route path="/molten" element={<MoltenPage />} />
      <Route path="/tribalbeats" element={<TribalBeatsPage />} />
      <Route path="/checker" element={<Tribal19CheckerPage />} />
      <Route path="/council" element={<CouncilPage />} />
      <Route path="/drops" element={<DropsPage />} />
      <Route path="/collection" element={<CollectionPage />} />
      <Route path="/wallpapers" element={<WallpapersPage />} />
      <Route path="/ens" element={<ENSPage />} />
      
      {/* Raffle Routes */}
      <Route path="/raffles/*" element={<RafflesPage />} />
      
      {/* Other Routes */}
      <Route path="/staking" element={<StakingApesPage />} />
      <Route path="/account" element={<ProfilePage />} />
      
      {/* 404 Route */}
      <Route path="*" element={<NetworkErrors />} />
    </Routes>
  );
};

export default AppRoutes;
