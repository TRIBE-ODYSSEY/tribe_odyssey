// hooks/useRaffleActions.ts
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useRaffleContext } from '../context/RaffleContext';
import { raffleService } from '@src/services/RaffleService';
import { useAccount, useSignMessage } from 'wagmi';

export const useRaffleActions = () => {
  const { address } = useAccount();
  const { data: signature, signMessageAsync } = useSignMessage();
  const { refreshRaffles } = useRaffleContext();

  const generateNonce = () => {
    return Math.floor(Math.random() * 1000000).toString();
  };

  const createSignatureMessage = (raffleId: string, points: number, nonce: string) => {
    return `Enter Raffle\n\nRaffle ID: ${raffleId}\nPoints: ${points}\nNonce: ${nonce}\nAddress: ${address}`;
  };

  const enterRaffle = useCallback(async (raffleId: string, points: number) => {
    try {
      if (!address) throw new Error('Wallet not connected');

      const nonce = generateNonce();
      const message = createSignatureMessage(raffleId, points, nonce);
      
      const signature = await signMessageAsync({ message });

      await raffleService.enterRaffle(raffleId, {
        address,
        entry: points,
        signature,
        nonce
      });

      toast.success('Successfully entered raffle!');
      refreshRaffles();
      return true;
    } catch (error: any) {
      if (error.code === 'ACTION_REJECTED') {
        toast.error('You rejected the signature request');
      } else {
        toast.error(error.message || 'Failed to enter raffle');
      }
      return false;
    }
  }, [address, signMessageAsync, refreshRaffles]);

  return { enterRaffle };
};