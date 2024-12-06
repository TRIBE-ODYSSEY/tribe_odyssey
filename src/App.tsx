// src/App.tsx
import { ConnectKitButton } from 'connectkit';
import React from 'react';
import { Web3Provider } from './lib/config/web3Provider';
import TestTailwind from './lib/tests_components/testTailwindComponent';
import WagmiCheckHealth from './lib/tests_components/WagmiCheckHealth';
const App: React.FC = () => {
  return (
    <Web3Provider>
      <div className="App">
        <h1 className="text-3xl font-bold text-center">Tribe Odyssey</h1>
        <ConnectKitButton />
        <TestTailwind />
        <WagmiCheckHealth />
      </div>
    </Web3Provider>
  );
};

export default App;
