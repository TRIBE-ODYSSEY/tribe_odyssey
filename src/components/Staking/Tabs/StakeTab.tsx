import React, { useState, useEffect } from 'react';
import NFTCard from '../NFTCard';
import Button from '@src/components/common/Button';
import { useAlchemy } from '@src/lib/hooks/useAlchemy';
import { useAuth } from '@src/lib/hooks/useAuth';
import { getStakingContract, getTribeContract } from '@src/lib/viem/helpers/contracts';
import { CHAIN_IDS } from '@src/lib/viem/contracts';
import { toast } from 'react-toastify';

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
  const { address } = useAuth();
  const { alchemy, isApprovedForAll, getUserStakedNFTs, getNFTsForOwner } = useAlchemy();
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);
  const [ownedTokens, setOwnedTokens] = useState<string[]>([]);
  const [isApproved, setIsApproved] = useState(false);
  
  const tribeContract = getTribeContract(CHAIN_IDS.MAINNET);
  const stakingContract = getStakingContract(CHAIN_IDS.MAINNET);

  // Fetch approval status and tokens
  useEffect(() => {
    const fetchData = async () => {
      if (!address) return;

      try {
        // Check approval
        const approved = await isApprovedForAll(tribeContract.address);
        setIsApproved(approved);

        // Get owned tokens
        const nfts = await getNFTsForOwner(address as Address, {
          contractAddresses: [tribeContract.address]
        });

        // Get staked tokens to filter out
        const stakedNFTs = await getUserStakedNFTs(stakingContract.address);
        const stakedIds = new Set(stakedNFTs.map(nft => nft.tokenId.toString()));

        // Filter out staked tokens
        const unstaked = nfts.ownedNfts
          .map(nft => nft.tokenId)
          .filter(id => !stakedIds.has(id));

        setOwnedTokens(unstaked);
      } catch (error) {
        console.error('Error fetching NFT data:', error);
        toast.error('Failed to fetch NFT data');
      }
    };

    fetchData();
  }, [address, alchemy, isApprovedForAll, getUserStakedNFTs, getNFTsForOwner, refreshTrigger]);

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
                  contract={tribeContract.address}
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