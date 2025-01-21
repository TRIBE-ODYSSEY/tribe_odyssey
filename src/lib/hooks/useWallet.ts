import { useEffect, useCallback } from 'react';
import { useWalletStore } from '../store';
import { walletService } from '../services';
import type { Address } from 'viem';

export const useWallet = () => {
  const { selectedWallet, balance, network, loading, error } = useWalletStore();

  const updateBalance = useCallback(async (address: Address) => {
    await walletService.getBalance(address);
  }, []);

  const updateNetwork = useCallback(async () => {
    await walletService.getNetwork();
  }, []);

  const registerENS = useCallback(async (domainName: string) => {
    if (!selectedWallet) throw new Error('No wallet connected');
    return await walletService.registerENS(domainName);
  }, [selectedWallet]);

  useEffect(() => {
    if (selectedWallet) {
      updateNetwork();
    }
  }, [selectedWallet, updateNetwork]);

  return {
    selectedWallet,
    balance,
    network,
    loading,
    error,
    updateBalance,
    updateNetwork,
    registerENS
  };
}; 