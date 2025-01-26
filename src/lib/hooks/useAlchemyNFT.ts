import { useCallback } from 'react';
import { alchemy } from '../config/alchemy';
import { toast } from 'react-toastify';

export const useAlchemyNFT = () => {
  const getNftsForOwner = useCallback(async (address: string, options?: any) => {
    try {
      return await alchemy.nft.getNftsForOwner(address, options);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      toast.error('Failed to fetch NFTs');
      throw error;
    }
  }, []);

  const getNftMetadata = useCallback(async (contractAddress: string, tokenId: string) => {
    try {
      return await alchemy.nft.getNftMetadata(contractAddress, tokenId);
    } catch (error) {
      console.error('Error fetching NFT metadata:', error);
      toast.error('Failed to fetch NFT metadata');
      throw error;
    }
  }, []);

  return { getNftsForOwner, getNftMetadata };
}; 