import React, { useState, useEffect } from 'react';
import NFTCard from '../NFTCard';
import Button from '@src/components/common/Button';
import { useAlchemy } from '@src/lib/hooks/useAlchemy';
import { getContractConfig } from '@src/lib/viem/contracts';
import { CHAIN_IDS, CONTRACT_NAMES } from '@src/lib/viem/contracts';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import type { Address } from 'viem';

interface StakeTabProps {
  onStake: (selectedNFTs: string[]) => Promise<void>;
  isWaiting: boolean;
  refreshTrigger: number;
}

const StakeTab: React.FC<StakeTabProps> = ({
  onStake,
  isWaiting,
  refreshTrigger
}) => {
  const { address, getSigner, isApprovedForAll, getNftsForOwner } = useAlchemy();
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);
  const [ownedTokens, setOwnedTokens] = useState<string[]>([]);
  const [isApproved, setIsApproved] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!address) return;

      try {
        const signer = await getSigner();
        const { address: stakingAddress, abi: stakingABI } = getContractConfig(CONTRACT_NAMES.STAKING, CHAIN_IDS.MAINNET);
        const { address: tribeAddress, abi: tribeABI } = getContractConfig(CONTRACT_NAMES.TRIBE, CHAIN_IDS.MAINNET);
        
        const stakingContract = new ethers.Contract(stakingAddress, stakingABI, signer);
        const tribeContract = new ethers.Contract(tribeAddress, tribeABI, signer);

        // Check approval
        const approved = await isApprovedForAll(tribeAddress as Address);
        setIsApproved(approved);

        // Get owned tokens
        const nfts = await getNftsForOwner(address as Address, {
          contractAddresses: [tribeAddress]
        });

        if (!stakingContract.getUserStakedNFTs) {
          throw new Error('Contract method not found');
        }

        // Get staked tokens to filter out
        const stakedNFTs = await stakingContract.getUserStakedNFTs(address);
        const stakedIds = new Set(stakedNFTs.map((nft: any) => nft.tokenId.toString()));

        // Filter out staked tokens
        const unstaked = nfts.ownedNfts
          .map((nft: any) => nft.tokenId)
          .filter((id: string) => !stakedIds.has(id));

        setOwnedTokens(unstaked);
      } catch (error) {
        console.error('Error fetching NFT data:', error);
        toast.error('Failed to fetch NFT data');
      }
    };

    fetchData();
  }, [address, getSigner, isApprovedForAll, getNftsForOwner, refreshTrigger]);

  const handleStake = async () => {
    if (!address || selectedNFTs.length === 0) return;
    
    try {
      await onStake(selectedNFTs);
      setSelectedNFTs([]);
    } catch (error) {
      console.error('Staking error:', error);
      toast.error('Failed to stake NFTs');
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
    setSelectedNFTs(prev => 
      prev.length === ownedTokens.length ? [] : [...ownedTokens]
    );
  };

  return (
    <div className="space-y-6">
      {!isApproved ? (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-[var(--color-text-primary)]">
              Stake
            </h3>
            <Button
              onClick={handleStake}
              disabled={!address || isWaiting}
              className="w-full bg-[var(--color-button-primary)] hover:bg-[var(--color-button-hover)] 
                        text-[var(--color-text-on-primary)]"
            >
              Stake
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-[var(--color-text-primary)]">
              Available NFTs ({ownedTokens.length})
            </h3>
            <button
              onClick={selectAll}
              className="text-[var(--color-button-primary)] hover:text-[var(--color-button-hover)] 
                       transition-colors duration-200"
            >
              {selectedNFTs.length === ownedTokens.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          {ownedTokens.length === 0 ? (
            <div className="text-center py-12 text-[var(--color-text-muted)]">
              No unstaked NFTs found
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {ownedTokens.map((tokenId) => (
                <NFTCard
                  key={tokenId}
                  tokenId={tokenId}
                  contract={getContractConfig(CONTRACT_NAMES.TRIBE, CHAIN_IDS.MAINNET).address as Address}
                  isStaked={false}
                  isSelected={selectedNFTs.includes(tokenId)}
                  onClick={() => toggleNFT(tokenId)}
                />
              ))}
            </div>
          )}

          <Button
            onClick={handleStake}
            disabled={selectedNFTs.length === 0 || !address || isWaiting}
            className="w-full bg-[var(--color-button-primary)] hover:bg-[var(--color-button-hover)] 
                      text-[var(--color-text-on-primary)] disabled:bg-[var(--color-button-disabled)]"
          >
            {isWaiting ? 'Staking...' : `Stake Selected (${selectedNFTs.length})`}
          </Button>
        </>
      )}
    </div>
  );
};

export default StakeTab;