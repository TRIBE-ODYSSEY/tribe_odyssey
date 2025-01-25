import { useCallback, useState } from 'react';
import { alchemyService } from '@src/lib/config/alchemy';
import type { Address } from 'viem';
import type { 
  OwnedNftsResponse,
  NftMetadata,
  TokenBalance,
  TransactionResponse,
  Block,
  BigNumber,
  Nft,
  GetNftsForOwnerOptions
} from 'alchemy-sdk';
import type { PoolInfo, StakedToken } from '@src/lib/config/alchemy';

export function useAlchemy() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // NFT Methods
  const getNFTsForOwner = useCallback(async (
    address: Address, 
    options?: GetNftsForOwnerOptions
  ): Promise<OwnedNftsResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      return await alchemyService.nft.getNftsForOwner(address, options);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getNFTMetadata = useCallback(async (
    contractAddress: string, 
    tokenId: string
  ): Promise<Nft> => {
    setIsLoading(true);
    setError(null);
    try {
      return await alchemyService.nft.getNftMetadata(contractAddress, tokenId);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getContractMetadata = useCallback(async (
    contractAddress: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      return await alchemyService.nft.getContractMetadata(contractAddress);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Token Methods
  const getTokenBalances = useCallback(async (
    address: Address
  ): Promise<{ tokenBalances: TokenBalance[] }> => {
    setIsLoading(true);
    setError(null);
    try {
      return await alchemyService.token.getTokenBalances(address);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Transaction Methods

  const getTransaction = useCallback(async (hash: string): Promise<TransactionResponse | null> => {
    setIsLoading(true);
    setError(null);
    try {
      return await alchemyService.transaction.getTransaction(hash);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Blockchain Methods
  const getLatestBlock = useCallback(async (): Promise<Block> => {
    setIsLoading(true);
    setError(null);
    try {
      return await alchemyService.blockchain.getLatestBlock();
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getGasPrice = useCallback(async (): Promise<BigNumber> => {
    setIsLoading(true);
    setError(null);
    try {
      return await alchemyService.blockchain.getGasPrice();
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // WebSocket Methods
  const subscribeToNewBlocks = useCallback((
    callback: (blockNumber: number) => void
  ) => {
    return alchemyService.websocket.subscribeToNewBlocks(callback);
  }, []);

  const subscribeToContractEvents = useCallback((
    contractAddress: string,
    eventName: string,
    callback: (log: any) => void
  ) => {
    return alchemyService.websocket.subscribeToContractEvents(
      contractAddress,
      eventName,
      callback
    );
  }, []);

  // Utility Methods
  const isContractAddress = useCallback(async (
    address: string
  ): Promise<boolean> => {
    try {
      return await alchemyService.utils.isContractAddress(address);
    } catch (err) {
      setError(err as Error);
      return false;
    }
  }, []);

  // Extended Utility Methods
  const utils = {
    formatEther: alchemyService.utils.formatEther,
    parseEther: alchemyService.utils.parseEther,
    encodeFunction: alchemyService.utils.encodeFunction,
    decodeFunctionResult: alchemyService.utils.decodeFunctionResult,
    formatUnits: alchemyService.utils.formatUnits,
    parseUnits: alchemyService.utils.parseUnits,
    keccak256: alchemyService.utils.keccak256,
    toHex: alchemyService.utils.toHex,
    fromHex: alchemyService.utils.fromHex,
    isAddress: alchemyService.utils.isAddress,
    getAddress: alchemyService.utils.getAddress,
  };

  // Add staking methods
  const getUserStakedNFTs = useCallback(async (
    contractAddress: Address
  ): Promise<StakedToken[]> => {
    setIsLoading(true);
    setError(null);
    try {
      return await alchemyService.staking.getUserStakedNFTs(contractAddress);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPoolInfo = useCallback(async (
    contractAddress: Address
  ): Promise<PoolInfo> => {
    setIsLoading(true);
    setError(null);
    try {
      return await alchemyService.staking.getPoolInfo(contractAddress);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const isApprovedForAll = useCallback(async (
    tokenAddress: Address,
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      return await alchemyService.staking.isApprovedForAll(tokenAddress);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    // State
    isLoading,
    error,

    // NFT Methods
    getNFTsForOwner,
    getNFTMetadata,
    getContractMetadata,

    // Token Methods
    getTokenBalances,

    // Transaction Methods
    getTransaction,


    // Blockchain Methods
    getLatestBlock,
    getGasPrice,

    // WebSocket Methods
    subscribeToNewBlocks,
    subscribeToContractEvents,
    // Utility Methods
    isContractAddress,
    ...utils,

    // Add staking methods to return
    getUserStakedNFTs,
    getPoolInfo,
    isApprovedForAll,

    // Direct access to alchemyService
    alchemy: alchemyService
  };
}

// Export types for use in components
export type { 
  OwnedNftsResponse,
  NftMetadata,
  TokenBalance,
  TransactionResponse,
  Block,
  BigNumber,
  PoolInfo,
  StakedToken,
  GetNftsForOwnerOptions
}; 