// src/AppRoutes.tsx
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy loaded pages
const AboutPage = lazy(() => import("@pages/main/about"));
const BeatsPage = lazy(() => import("@pages/assets/beats"));
const CheckerPage = lazy(() => import("@pages/assets/checker"));
const ClaimPage = lazy(() => import("@pages/claim"));
const CouncilPage = lazy(() => import("@pages/council"));
const Element19Page = lazy(() => import("@pages/element19/Element19Page"));
const ElementTribe = lazy(() => import("@pages/fun"));
const EnsPage = lazy(() => import("@pages/assets/ens"));
const FAQPage = lazy(() => import("@pages/main/faq"));
const HomePage = lazy(() => import("@pages/HomePage"));
const MoltenPage = lazy(() => import("@pages/molten"));
const ProfilePage = lazy(() => import("@pages/profile"));
const RaffleOpenPage = lazy(() => import("@pages/staking/raffle/rafflesopened"));
const RafflesAdminPage = lazy(() => import("@pages/staking/raffle/rafflesadmin"));
const RafflesPage = lazy(() => import("@src/pages/staking/raffle/raffles"));
const StakingPage = lazy(() => import("@src/pages/Staking/StakeApes"));
const ThreadsPage = lazy(() => import("@src/pages/threads"));
const WinnersPage = lazy(() => import("@pages/Staking/Winners/Winners"));
  const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fun" element={<ElementTribe />} />
        <Route path="/ens" element={<EnsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/beats" element={<BeatsPage />} />
        <Route path="/claim" element={<ClaimPage />} />
        <Route path="/council" element={<CouncilPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/raffles" element={<RafflesPage />} />
        <Route path="/raffles/admin" element={<RafflesAdminPage />} />
        <Route path="/raffles/:id" element={<RaffleOpenPage />} />
        <Route path="/staking" element={<StakingPage />} />
        <Route path="/wallpaper" element={<WallpaperPage />} />
        <Route path="/winners" element={<WinnersPage />} />
        <Route path="/checker" element={<CheckerPage />} />
        <Route path="/molten" element={<MoltenPage />} />
        <Route path="/drops" element={<Element19Page />} />
        <Route path="/collection" element={<Element19Page />} />
        {/* <Route path="/drops/:id" element={<ItemDetailPage />} /> */}
        <Route path="/threads" element={<ThreadsPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
