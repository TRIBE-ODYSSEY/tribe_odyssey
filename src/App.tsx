// src/App.tsx
import { ConnectKitButton } from 'connectkit';
import React from 'react';
import AppRoutes from './AppRoute';
import HealtChecker from './pages/health/health_checker';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center">Tribe Odyssey</h1>
      <ConnectKitButton />
      <HealtChecker />
      <AppRoutes />
    </div>
  );
};

export default App;
