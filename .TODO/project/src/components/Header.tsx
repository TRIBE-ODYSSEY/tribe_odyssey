import React from 'react';
import { ConnectKitButton } from 'connectkit';
import { Wallet } from 'lucide-react';

export const Header = () => {
  return (
    <header className="w-full py-4 px-6 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Wallet className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold">NFT Staking</h1>
        </div>
        <ConnectKitButton />
      </div>
    </header>
  );
};