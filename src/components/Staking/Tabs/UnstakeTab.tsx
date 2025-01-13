import React, { useState, useEffect } from 'react';
import NFTCard from '../NFTCard';
import Button from '@src/components/common/Button';
import { useAccount } from 'wagmi';
import { useReadContract } from 'wagmi';
import { getStakingContract } from '@src/lib/viem/helpers/contracts';
import { CHAIN_IDS } from '@src/lib/viem/contracts';
import { toast } from 'react-toastify';
import type { Address } from 'viem';

interface UnstakeTabProps {
  onUnstake: (selectedNFTs: string[]) => Promise<void>;
  isWaiting: boolean;
  refreshTrigger: number;
}

interface StakedNFT {
  tokenId: bigint;
  stakedAt: bigint;
}

const UnstakeTab: React.FC<UnstakeTabProps> = ({
  onUnstake,
  isWaiting,
  refreshTrigger
}) => {
  const { address } = useAccount();
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);
  const stakingContract = getStakingContract(CHAIN_IDS.MAINNET);

  // Get user's staked NFTs
  const { data: stakedNFTs = [] } = useReadContract({
    address: stakingContract.address as Address,
    abi: stakingContract.abi,
    functionName: 'userStakedNFTs',
    args: address ? [BigInt(0), address as Address] : undefined,
    query: {
      enabled: Boolean(address),
    }
  }) as { data: StakedNFT[] | undefined };

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
    const stakedIds = (stakedNFTs || []).map(nft => nft.tokenId.toString());
    setSelectedNFTs(prev => 
      prev.length === stakedIds.length ? [] : stakedIds
    );
  };

  // Reset selections when refreshTrigger changes
  useEffect(() => {
    setSelectedNFTs([]);
  }, [refreshTrigger]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">
          Staked NFTs ({(stakedNFTs || []).length})
        </h3>
        <button
          onClick={selectAll}
          className="text-red-400 hover:text-red-300 transition-colors"
        >
          {selectedNFTs.length === (stakedNFTs || []).length ? 'Deselect All' : 'Select All'}
        </button>
      </div>

      {!stakedNFTs || stakedNFTs.length === 0 ? (
        <div className="text-center py-12 text-white/60">
          No staked NFTs found
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {stakedNFTs.map((nft) => (
            <NFTCard
              key={nft.tokenId.toString()}
              tokenId={nft.tokenId.toString()}
              contract={stakingContract.address as Address}
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
        className="w-full"
      >
        {isWaiting ? 'Unstaking...' : `Unstake Selected (${selectedNFTs.length})`}
      </Button>
    </div>
  );
};

export default UnstakeTab;