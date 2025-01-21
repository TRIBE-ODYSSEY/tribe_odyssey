import { WalletButton } from '@rainbow-me/rainbowkit';
import React from 'react';

export const WalletButtons = () => {
  return (
    <div className="flex flex-col gap-2">
      <WalletButton wallet="rainbow" />
      <WalletButton wallet="metamask" />
      <WalletButton wallet="coinbase" />
      <WalletButton wallet="ledger" />
    </div>
  );
}; 