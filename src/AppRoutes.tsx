// src/AppRoutes.tsx
import useLazyLoading from '@hooks/useLazyLoading';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingSpinner from '@src/components/common/LoadingSpinner';

// Lazy loaded pages
const HomePage = lazy(() => import('@src/pages/HomePage'));
const HealthChecker = lazy(() => import('@src/pages/health/health_checker'));
const ENSPage = lazy(() => import('@src/pages/Assets/ENS'));
const FourKPage = lazy(() => import('@src/pages/Assets/4kTribe'));
const MoltenPage = lazy(() => import('@src/pages/Assets/Molten'));
const TribalBeatsPage = lazy(() => import('@src/pages/Assets/TribalBeats'));
const Tribal19CheckerPage = lazy(() => import('@src/pages/Assets/Tribal19Checker'));
const CouncilPage = lazy(() => import('@src/pages/Council'));
const RafflesPage = lazy(() => import('@src/pages/Raffles/raffles'));
const StakingApesPage = lazy(() => import('@src/pages/Staking/StakeApes'));
const DropsPage = lazy(() => import('@src/pages/Element19/Drops'));
const CollectionPage = lazy(() => import('@src/pages/Element19/Collection'));
const WallpapersPage = lazy(() => import('@src/pages/Assets/Wallpapers'));
const ProfilePage = lazy(() => import('@src/pages/Profile'));
const NetworkErrors = lazy(() => import('@src/components/common/errors/network/NetworkErrors'));
const MaintenancePage = lazy(() => import('@src/pages/Maintenance'));
const ThreadsPage = lazy(() => import('@src/pages/Threads'));
const WinnersPage = lazy(() => import('@src/pages/Winners'));

const MAINTENANCE_MODE = import.meta.env.VITE_MAINTENANCE_MODE === 'true';

const AppRoutes: React.FC = () => {
  useLazyLoading();

  if (MAINTENANCE_MODE) {
    return <MaintenancePage />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/health" element={<HealthChecker />} />
        <Route path="/4kTribe" element={<FourKPage />} />
        <Route path="/molten" element={<MoltenPage />} />
        <Route path="/tribalbeats" element={<TribalBeatsPage />} />
        <Route path="/checker" element={<Tribal19CheckerPage />} />
        <Route path="/council" element={<CouncilPage />} />
        <Route path="/raffles" element={<RafflesPage />} />
        <Route path="/drops" element={<DropsPage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/wallpapers" element={<WallpapersPage />} />
        <Route path="/ens" element={<ENSPage />} />
        <Route path="/threads" element={<ThreadsPage />} />
        <Route path="/winners" element={<WinnersPage />} />

        {/* Other Routes */}
        <Route path="/staking" element={<StakingApesPage />} />
        <Route path="/account" element={<ProfilePage />} />

        
        {/* 404 Route */}
        <Route path="*" element={<NetworkErrors />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
