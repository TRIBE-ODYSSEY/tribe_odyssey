// hooks/useRaffleActions.ts
import { useAccount, useSignMessage } from 'wagmi';
import { toast } from 'react-toastify';
import { useRaffleContext } from '../context/RaffleContext';
import { randomPicker } from '../services/randomPicker';

export const useRaffleActions = () => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { refreshRaffles } = useRaffleContext();

  const enterRaffle = async (raffleId: string, points: number) => {
    try {
      if (!address) throw new Error('Wallet not connected');

      const nonce = await randomPicker.getNonce(address);
      const signature = await signMessageAsync({
        message: `I am signing my one-time nonce: ${nonce}`,
      });
      
      const response = await randomPicker.enterRaffleProject(raffleId, {
        address,
        points,
        signature
      });

      if (response.success) {
        toast.success('Successfully entered raffle!');
        refreshRaffles();
        return true;
      } else {
        throw new Error(response.error);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to enter raffle');
      return false;
    }
  };

  return { enterRaffle };
};