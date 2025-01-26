import React from 'react';
import { FaWallet, FaTimes } from 'react-icons/fa';
import { SiMetabase, SiCoinbase, SiBrave } from 'react-icons/si';
import { useAlchemy } from '@src/lib/hooks/useAlchemy';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const wallets = [
  { id: 'metabase', name: 'MetaMask', icon: <SiMetabase className="w-8 h-8" /> },
  { id: 'coinbase', name: 'Coinbase', icon: <SiCoinbase className="w-8 h-8" /> },
  { id: 'brave', name: 'Brave', icon: <SiBrave className="w-8 h-8" /> },
];

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { connect } = useAlchemy();

  if (!isOpen) return null;

  const handleWalletSelect = async (walletId: string) => {
    try {
      await connect(walletId);
      onClose();
    } catch (error) {
      console.error('Wallet connection error:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[var(--color-secondary)] rounded-xl w-full max-w-md p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <FaWallet className="w-12 h-12 mx-auto mb-4 text-[var(--color-button-primary)]" />
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
            Connect Wallet
          </h2>
          <p className="text-[var(--color-text-muted)] mt-2">
            Choose your preferred wallet
          </p>
        </div>

        <div className="grid gap-3">
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => handleWalletSelect(wallet.id)}
              className="flex items-center gap-4 w-full p-4 rounded-lg
                         bg-[var(--color-tertiary)] hover:bg-[var(--color-tertiary)]/80
                         border border-[var(--color-text-primary)]/10
                         text-[var(--color-text-primary)] transition-all"
            >
              {wallet.icon}
              <span className="font-medium">{wallet.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletModal; 