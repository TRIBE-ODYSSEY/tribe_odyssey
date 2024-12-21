import React, { Suspense } from 'react';
import AppRoutes from './AppRoutes';

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppRoutes />
    </Suspense>
  );
};

export default App;
