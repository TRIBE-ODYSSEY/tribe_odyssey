import React, { useState } from 'react';
import NFTCard from '../NFTCard';
import Button from '@src/components/common/Button';
import { getStakingAddress, getTribeAddress } from '@src/utils/address';
import { toast } from 'react-toastify';
import type { Address } from 'viem';
import stakingABI from '@src/lib/config/abi/staking.json';
import tribeABI from '@src/lib/config/abi/tribe.json';
import { useAccount, useReadContract } from 'wagmi';
import { StakedToken } from '@src/lib/config/alchemy';

interface StakeTabProps {
  onStake: (selectedNFTs: string[]) => Promise<void>;
  isWaiting: boolean;
}

const StakeTab: React.FC<StakeTabProps> = ({
  onStake,
  isWaiting,
}) => {
  const { address } = useAccount();
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);
  
  const tribeConfig = getTribeAddress();
  const stakingConfig = getStakingAddress();

  const { data: isApproved = false } = useReadContract({
    ...tribeConfig,
    abi: tribeABI,
    functionName: 'isApprovedForAll',
    args: [address, stakingConfig.address],
    query: {
      enabled: !!address
    }
  });

  const { data: stakedNFTs } = useReadContract({
    ...stakingConfig,
    abi: stakingABI,
    functionName: 'getUserStakedNFTs',
    args: [address],
    query: {
      enabled: !!address
    }
  });

  const { data: ownedTokensData } = useReadContract({
    ...tribeConfig,
    abi: tribeABI,
    functionName: 'tokensOfOwner',
    args: [address],
    query: {
      enabled: !!address
    }
  });

  // Filter out staked tokens
  const stakedIds = new Set(((stakedNFTs || []) as StakedToken[]).map(nft => nft.tokenId.toString()));
  const ownedTokens = ((ownedTokensData || []) as bigint[])
    .map((id: bigint) => id.toString())
    .filter(id => !stakedIds.has(id));

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
        <div className="text-center py-12">
          <p className="text-[var(--color-text-muted)] mb-4">
            Approval required to stake NFTs
          </p>
          <Button
            onClick={handleStake}
            disabled={!address || isWaiting}
            className="bg-[var(--color-button-primary)] hover:bg-[var(--color-button-hover)] 
                      text-[var(--color-text-on-primary)]"
          >
            Approve Staking
          </Button>
        </div>
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
              {ownedTokens.map((tokenId: string) => (
                <NFTCard
                  key={tokenId}
                  tokenId={tokenId}
                  contract={tribeConfig.address as Address}
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