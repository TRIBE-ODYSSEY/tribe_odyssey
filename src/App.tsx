import React, { Suspense } from 'react';
import AppRoutes from './AppRoutes';

const App: React.FC = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </div>
  );
};

export default App;
