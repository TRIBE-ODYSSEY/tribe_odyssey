import { useCallback } from 'react';
import { alchemy } from '../config/alchemy';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { useAlchemyProvider } from './useAlchemyProvider';
import type { Address } from 'viem';

export const useAlchemyNFT = () => {
  const { getSigner } = useAlchemyProvider();

  const getNftsForOwner = useCallback(async (address: string, options?: any) => {
    try {
      const response = await alchemy.nft.getNftsForOwner(address, options);
      return response;
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      toast.error('Failed to fetch NFTs');
      throw error;
    }
  }, []);

  const getNftMetadata = useCallback(async (contractAddress: string, tokenId: string) => {
    try {
      const response = await alchemy.nft.getNftMetadata(contractAddress, tokenId);
      return response;
    } catch (error) {
      console.error('Error fetching NFT metadata:', error);
      toast.error('Failed to fetch NFT metadata');
      throw error;
    }
  }, []);

  const getStakedNFTs = useCallback(async (contractAddress: Address) => {
    try {
      const signer = await getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        ['function getUserStakedNFTs(address) view returns (tuple(uint256 tokenId, uint256 stakedAt)[])'],
        signer
      );
      const address = await signer.getAddress();
      if (!contract.getUserStakedNFTs) throw new Error('Contract method not found');
      return await contract.getUserStakedNFTs(address);
    } catch (error) {
      console.error('Error fetching staked NFTs:', error);
      toast.error('Failed to fetch staked NFTs');
      throw error;
    }
  }, [getSigner]);

  return { getNftsForOwner, getNftMetadata, getStakedNFTs };
}; 