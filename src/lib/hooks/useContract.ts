import { useCallback } from 'react';
import { contractService } from '../services';
import { useConfigStore } from '../store';

export const useContract = (contractName: string) => {
  const { chainId, networkName } = useConfigStore();

  const callMethod = useCallback(async (method: string, ...args: any[]) => {
    try {
      return await contractService.callMethod(contractName, method, ...args);
    } catch (error) {
      console.error(`Contract method call failed: ${error}`);
      return null;
    }
  }, [contractName]);

  return {
    chainId,
    networkName,
    callMethod
  };
}; 