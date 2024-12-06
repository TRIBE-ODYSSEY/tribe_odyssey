// src/AppRoutes.tsx
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// // Lazy loaded pages
const HomePage = React.lazy(() => import('@src/pages/HomePage'));
const HealtChecker = React.lazy(
  () => import('@src/pages/health/health_checker')
);
// const AboutPage = lazy(() => import('@pages/main/about'));
// const BeatsPage = lazy(() => import('@pages/assets/beats'));
// const CheckerPage = lazy(() => import('@pages/assets/checker'));
// const ClaimPage = lazy(() => import('@pages/claim'));
// const CouncilPage = lazy(() => import('@pages/council'));
// const Element19Page = lazy(() => import('@pages/element19/Element19Page'));
// const ElementTribe = lazy(() => import('@pages/fun'));
// const EnsPage = lazy(() => import('@pages/assets/ens'));
// const FAQPage = lazy(() => import('@pages/main/faq'));
// const HomePage = lazy(() => import('@pages/HomePage'));
// const MoltenPage = lazy(() => import('@pages/molten'));
// const ProfilePage = lazy(() => import('@pages/profile'));
// const RaffleOpenPage = lazy(() => import('@pages/staking/raffle/rafflesopened'));
// const RafflesAdminPage = lazy(() => import('@pages/staking/raffle/rafflesadmin'));
// const RafflesPage = lazy(() => import('@pages/staking/raffle/raffles'));
// const StakingPage = lazy(() => import('@pages/Staking/StakeApes'));
// const ThreadsPage = lazy(() => import('@pages/threads'));
// const WinnersPage = lazy(() => import('@pages/Staking/Winners/Winners'));
// const NotFoundPage = lazy(() => import('@pages/NotFoundPage')); // Strona 404

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/health" element={<HealtChecker />} />
      </Routes>
    </Suspense>
  );
};

export default App;
