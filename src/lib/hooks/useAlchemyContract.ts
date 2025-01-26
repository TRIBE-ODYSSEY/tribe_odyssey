import { useCallback } from 'react';
import { alchemy } from '../config/alchemy';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

export const useAlchemyContract = () => {
  const getContractEvents = useCallback(async (contractAddress: string, eventName: string) => {
    try {
      return await alchemy.core.getLogs({
        address: contractAddress,
        topics: [ethers.id(eventName)]
      });
    } catch (error) {
      console.error('Error fetching contract events:', error);
      toast.error('Failed to fetch contract events');
      throw error;
    }
  }, []);

  const isContractAddress = useCallback(async (address: string) => {
    try {
      return await alchemy.core.isContractAddress(address);
    } catch (error) {
      console.error('Error checking contract address:', error);
      return false;
    }
  }, []);

  return { getContractEvents, isContractAddress };
}; 