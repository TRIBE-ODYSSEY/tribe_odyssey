// src/App.tsx
import { ConnectKitButton } from 'connectkit';
import React from 'react';

import TestTailwind from './lib/tests_components/testTailwindComponent';
import WagmiCheckHealth from './lib/tests_components/WagmiCheckHealth';
const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center">Tribe Odyssey</h1>
      <ConnectKitButton />
      <TestTailwind />
      <WagmiCheckHealth />
    </div>
  );
};

export default App;
