import React, { useState } from 'react';
import NFTCard from '../NFTCard';
import Button from '@src/components/common/Button';
import { getStakingAddress } from '@src/utils/address';
import { toast } from 'react-toastify';
import type { Address } from 'viem';
import stakingABI from '@src/lib/config/abi/staking.json';
import { useAccount, useReadContract } from 'wagmi';

interface UnstakeTabProps {
  onUnstake: (selectedNFTs: string[]) => Promise<void>;
  isWaiting: boolean;
}

const UnstakeTab: React.FC<UnstakeTabProps> = ({
  onUnstake,
  isWaiting
}) => {
  const { address } = useAccount();
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);

  const { data: stakedNFTs = [] as any[], isError } = useReadContract({
    ...getStakingAddress(),
    abi: stakingABI,
    functionName: 'userStakedNFTs',
    args: [0n, address],
    query: {
      enabled: !!address
    }
  });

  if (isError) {
    toast.error('Failed to fetch staked NFTs');
  }

  const handleUnstake = async () => {
    if (!address || selectedNFTs.length === 0) return;
    
    try {
      await onUnstake(selectedNFTs);
      setSelectedNFTs([]);
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
    const stakedIds = (stakedNFTs as any[]).map(nft => nft.tokenId.toString());
    setSelectedNFTs(prev => 
      prev.length === stakedIds.length ? [] : stakedIds
    );
  };

  const stakedTokens = (stakedNFTs || []) as any[];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-[var(--color-text-primary)]">
          Staked NFTs ({stakedTokens.length})
        </h3>
        <button
          onClick={selectAll}
          className="text-[var(--color-button-primary)] hover:text-[var(--color-button-hover)] 
                   transition-colors duration-200"
        >
          {selectedNFTs.length === stakedTokens.length ? 'Deselect All' : 'Select All'}
        </button>
      </div>

      {stakedTokens.length === 0 ? (
        <div className="text-center py-12 text-[var(--color-text-muted)]">
          No staked NFTs found
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {stakedTokens.map((nft) => (
            <NFTCard
              key={nft.tokenId.toString()}
              tokenId={nft.tokenId.toString()}
              contract={getStakingAddress().address as Address}
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