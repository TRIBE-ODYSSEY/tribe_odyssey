import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { raffleService } from '@src/services/RaffleService';
import { useAlchemy } from '@src/lib/hooks/useAlchemy';

export const useAdminActions = () => {
  const { address, getSigner } = useAlchemy();

  const creditPoints = useCallback(async (userAddress: string, amount: number) => {
    try {
      if (!address) throw new Error('Admin wallet not connected');

      const signer = await getSigner();
      const nonce = await raffleService.getNonce(address);
      const message = raffleService.createAdminSignatureMessage(
        'Credit Points',
        {
          userAddress,
          amount,
          adminAddress: address,
          timestamp: Date.now()
        },
        nonce
      );

      const signature = await signer.signMessage(message);
      await raffleService.creditPoints(address, userAddress, amount, signature, nonce);
      
      toast.success('Points credited successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to credit points');
      throw error;
    }
  }, [address, getSigner]);

  const transferPoints = useCallback(async (fromAddress: string, toAddress: string, amount: number) => {
    try {
      if (!address) throw new Error('Admin wallet not connected');

      const signer = await getSigner();
      const nonce = await raffleService.getNonce(address);
      const message = raffleService.createAdminSignatureMessage(
        'Transfer Points',
        {
          fromAddress,
          toAddress,
          amount,
          adminAddress: address,
          timestamp: Date.now()
        },
        nonce
      );

      const signature = await signer.signMessage(message);
      await raffleService.transferPoints(address, fromAddress, toAddress, amount, signature, nonce);
      
      toast.success('Points transferred successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to transfer points');
      throw error;
    }
  }, [address, getSigner]);

  return {
    creditPoints,
    transferPoints
  };
}; 