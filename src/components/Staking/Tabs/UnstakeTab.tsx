import React, { useState } from 'react';
import NFTCard from '../NFTCard';
import Button from '@src/components/common/Button';
import { useAccount } from 'wagmi';
import { useReadContract, useWriteContract } from 'wagmi';
import { getStakingContract } from '@src/lib/viem/helpers/contracts';
import { CHAIN_IDS } from '@src/lib/viem/contracts';
import { toast } from 'react-toastify';

interface UnstakeTabProps {
  onUnstake: (selectedNFTs: string[]) => Promise<void>;
  isWaiting: boolean;
  refreshTrigger: number;
}

const UnstakeTab: React.FC<UnstakeTabProps> = ({
  onUnstake,
  isWaiting
}) => {
  const { address } = useAccount();
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);
  const stakingContract = getStakingContract(CHAIN_IDS.MAINNET);

  // Get user's staked NFTs
  const { data: stakedNFTs = [] } = useReadContract({
    ...stakingContract,
    functionName: 'userStakedNFTs',
    args: [BigInt(0), address],
    enabled: Boolean(address),
  });

  const { writeContractAsync: unstake } = useWriteContract();

  const handleUnstake = async () => {
    if (!address || selectedNFTs.length === 0) return;
    try {
      await unstake({
        ...stakingContract,
        functionName: 'leaveMany',
        args: [BigInt(0), selectedNFTs.map(id => BigInt(id))] as const,
        address: stakingContract.address as `0x${string}`,
      });
      
      await onUnstake(selectedNFTs);
      toast.success('NFTs unstaked successfully!');
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">
          Staked NFTs ({stakedNFTs.length})
        </h3>
      </div>

      {stakedNFTs.length === 0 ? (
        <div className="text-center py-12 text-white/60">
          No staked NFTs found
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {stakedNFTs.map((nft) => (
            <NFTCard
              key={nft.id}
              tokenId={nft.tokenId}
              contract={nft.contract}
              isStaked={nft.is_staked}
              isSelected={selectedNFTs.includes(nft.id)}
              onClick={() => toggleNFT(nft.id)}
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