// src/AppRoutes.tsx
import useLazyLoading from '@hooks/useLazyLoading';
import { Spinner } from 'flowbite-react';
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
// Lazy loaded pages
const HomePage = lazy(() => import('@src/pages/HomePage'));
const HealthChecker = lazy(() => import('@src/pages/health/health_checker'));
const NotFoundPage = lazy(
  () => import('@src/components/common/errors/network/NetworkErrors')
);

const AppRoutes: React.FC = () => {
  useLazyLoading();
  return (
    <Suspense
      fallback={
        
        <Spinner color="warning" aria-label="Warning spinner example" />
      }
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/health" element={<HealthChecker />} />

        {/* Strona 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
