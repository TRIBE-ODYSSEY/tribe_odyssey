// src/AppRoutes.tsx
import React, { Suspense, lazy} from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy loaded pages
const HomePage = lazy(() => import('@src/pages/HomePage'));
const HealthChecker = lazy(() => import('@src/pages/health/health_checker'));
const NotFoundPage = lazy(() => import('@src/components/errors/NotFoundPage'));

const AppRoutes: React.FC = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
