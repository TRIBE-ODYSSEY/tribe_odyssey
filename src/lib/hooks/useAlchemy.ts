import { useCallback } from 'react';
import { useAlchemyProvider } from './useAlchemyProvider';
import { useAlchemyAuth } from './useAlchemyAuth';
import { useAlchemyNFT } from './useAlchemyNFT';
import { useAlchemyContract } from './useAlchemyContract';
import { ethers } from 'ethers';
import type { Address } from 'viem';
import type { 
  OwnedNftsResponse,
  NftMetadata,
  TokenBalance,
  TransactionResponse,
  Block,
  BigNumber,
  GetNftsForOwnerOptions
} from 'alchemy-sdk';

export function useAlchemy() {
  const { getProvider, getSigner } = useAlchemyProvider();
  const { connect, disconnect, isConnected, address, provider } = useAlchemyAuth();
  const { getNftsForOwner, getNftMetadata } = useAlchemyNFT();
  const { getContractEvents, isContractAddress } = useAlchemyContract();

  // Utility Methods
  const utils = {
    formatEther: ethers.formatEther,
    parseEther: ethers.parseEther,
    formatUnits: ethers.formatUnits,
    parseUnits: ethers.parseUnits,
    isAddress: ethers.isAddress,
    getAddress: ethers.getAddress,
  };

  // Staking Methods
  const getUserStakedNFTs = useCallback(async (contractAddress: Address) => {
    const signer = await getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      ['function getUserStakedNFTs(address) view returns (tuple(uint256 tokenId, uint256 stakedAt)[])'],
      signer
    );
    const userAddress = await signer.getAddress();
    if (!contract.getUserStakedNFTs) throw new Error('Contract method not found');
    return await contract.getUserStakedNFTs(userAddress);
  }, [getSigner]);

  const getPoolInfo = useCallback(async (contractAddress: Address) => {
    const signer = await getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      ['function getPoolInfo() view returns (tuple(uint256 rewardRate, uint256 lastRewardTime, uint256 accRewardPerShare, uint256 totalStaked))'],
      signer
    );
    if (!contract.getPoolInfo) throw new Error('Contract method not found');
    return await contract.getPoolInfo();
  }, [getSigner]);

  const isApprovedForAll = useCallback(async (tokenAddress: Address) => {
    const signer = await getSigner();
    const contract = new ethers.Contract(
      tokenAddress,
      ['function isApprovedForAll(address owner, address operator) view returns (bool)'],
      signer
    );
    const userAddress = await signer.getAddress();
    if (!contract.isApprovedForAll) throw new Error('Contract method not found');
    return await contract.isApprovedForAll(userAddress, tokenAddress);
  }, [getSigner]);

  return {
    // Provider Methods
    getProvider,
    getSigner,

    // Auth Methods
    connect,
    disconnect,
    isConnected,
    address,
    provider,

    // NFT Methods
    getNftsForOwner,
    getNftMetadata,

    // Contract Methods
    getContractEvents,
    isContractAddress,

    // Staking Methods
    getUserStakedNFTs,
    getPoolInfo,
    isApprovedForAll,

    // Utility Methods
    utils,
  };
}

export type { 
  PoolInfo,
  StakedToken,
} from '@src/lib/config/alchemy';

// Export types for use in components
export type { 
  OwnedNftsResponse,
  NftMetadata,
  TokenBalance,
  TransactionResponse,
  Block,
  BigNumber,
  GetNftsForOwnerOptions
}; 