import Layout from '@src/components/common/layout/Layout';
import React, { Suspense } from 'react';
import AppRoutes from './AppRoutes';

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>
        <AppRoutes />
      </Layout>
    </Suspense>
  );
};

export default App;
