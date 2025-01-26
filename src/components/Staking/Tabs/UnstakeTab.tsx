import React, { useState, useEffect } from 'react';
import NFTCard from '../NFTCard';
import Button from '@src/components/common/Button';
import { useAlchemy } from '@src/lib/hooks/useAlchemy';
import { getContractConfig } from '@src/lib/viem/contracts';
import { CHAIN_IDS, CONTRACT_ADDRESSES } from '@src/lib/viem/contracts';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import type { Address } from 'viem';
import type { StakedToken } from '@src/lib/config/alchemy';

interface UnstakeTabProps {
  onUnstake: (selectedNFTs: string[]) => Promise<void>;
  isWaiting: boolean;
  refreshTrigger: number;
}

const UnstakeTab: React.FC<UnstakeTabProps> = ({
  onUnstake,
  isWaiting,
  refreshTrigger
}) => {
  const { address, getSigner } = useAlchemy();
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);
  const [stakedNFTs, setStakedNFTs] = useState<StakedToken[]>([]);

  useEffect(() => {
    const fetchStakedNFTs = async () => {
      if (!address) return;
      
      try {
        const signer = await getSigner();
        const { address: stakingAddress, abi: stakingABI } = getContractConfig(CONTRACT_ADDRESSES.STAKING, CHAIN_IDS.MAINNET);
        const contract = new ethers.Contract(stakingAddress, stakingABI, signer);

        if (!contract.getUserStakedNFTs) {
          throw new Error('Contract method not found');
        }

        const nfts = await contract.getUserStakedNFTs(address);
        setStakedNFTs(nfts);
      } catch (error) {
        console.error('Error fetching staked NFTs:', error);
        toast.error('Failed to fetch staked NFTs');
      }
    };

    fetchStakedNFTs();
  }, [address, getSigner, refreshTrigger]);

  const handleUnstake = async () => {
    if (!address || selectedNFTs.length === 0) return;
    
    try {
      await onUnstake(selectedNFTs);
      setSelectedNFTs([]);
      toast.success(`Successfully unstaked ${selectedNFTs.length} NFT(s)`);
    } catch (error) {
      console.error('Unstaking error:', error);
      toast.error('Failed to unstake NFTs');
    }
  };

  const toggleNFT = (id: string) => {
    setSelectedNFTs(prev => 
      prev.includes(id) 
        ? prev.filter(nftId => nftId !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    const stakedIds = stakedNFTs.map(nft => nft.tokenId.toString());
    setSelectedNFTs(prev => 
      prev.length === stakedIds.length ? [] : stakedIds
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-[var(--color-text-primary)]">
          Staked NFTs ({stakedNFTs.length})
        </h3>
        <button
          onClick={selectAll}
          className="text-[var(--color-button-primary)] hover:text-[var(--color-button-hover)] 
                   transition-colors duration-200"
        >
          {selectedNFTs.length === stakedNFTs.length ? 'Deselect All' : 'Select All'}
        </button>
      </div>

      {stakedNFTs.length === 0 ? (
        <div className="text-center py-12 text-[var(--color-text-muted)]">
          No staked NFTs found
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {stakedNFTs.map((nft) => (
            <NFTCard
              key={nft.tokenId.toString()}
              tokenId={nft.tokenId.toString()}
              contract={getContractConfig(CONTRACT_ADDRESSES.STAKING, CHAIN_IDS.MAINNET).address as Address}
              isStaked={true}
              isSelected={selectedNFTs.includes(nft.tokenId.toString())}
              onClick={() => toggleNFT(nft.tokenId.toString())}
            />
          ))}
        </div>
      )}

      <Button
        onClick={handleUnstake}
        disabled={selectedNFTs.length === 0 || !address || isWaiting}
        className="w-full bg-[var(--color-button-primary)] hover:bg-[var(--color-button-hover)] 
                  text-[var(--color-text-on-primary)] disabled:bg-[var(--color-button-disabled)]"
      >
        {isWaiting ? 'Unstaking...' : `Unstake Selected (${selectedNFTs.length})`}
      </Button>
    </div>
  );
};

export default UnstakeTab;