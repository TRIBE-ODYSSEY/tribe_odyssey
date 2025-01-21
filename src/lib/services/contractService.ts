import { useConfigStore } from '../store';
import { readContract, writeContract } from '../wagmi/actions/contracts';
import type { Address, Hash } from 'viem';
import type { ContractName } from '../wagmi/actions/contracts';

export const contractService = {
  getContract: (name: string) => {
    const store = useConfigStore.getState();
    const address = store.contractAddresses[name];
    
    if (!address) {
      throw new Error(`Contract ${name} not found`);
    }

    return {
      address: address as Address,
      chainId: store.chainId,
      network: store.networkName
    };
  },

  callMethod: async (contractName: string, method: string, ...args: unknown[]) => {
    try {
      const { address } = contractService.getContract(contractName);
      return await readContract(
        address,
        contractName as ContractName,
        method,
        args
      );
    } catch (error) {
      throw new Error(`Contract call failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  writeMethod: async (contractName: string, method: string, ...args: unknown[]): Promise<Hash> => {
    try {
      const { address } = contractService.getContract(contractName);
      return await writeContract(
        address,
        contractName as ContractName,
        method,
        args
      );
    } catch (error) {
      throw new Error(`Contract write failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}; 