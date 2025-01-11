import React, { useState, useEffect } from 'react';
import NFTCard from '../NFTCard';
import Button from '@src/components/common/Button';
// @ts-ignore
import { useAccount } from 'wagmi';
import { 
  useWriteStakingLeaveMany, 
  useReadStakingUserStakedNfTs,
  useReadStakingUserInfo 
} from '@src/generated';
import { toast } from 'react-toastify';

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
  const { address } = useAccount();
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);
  
  const { data: stakedNFTs, isLoading } = useReadStakingUserStakedNfTs({
    args: [address!, '0x0']
  });

  const { data: userInfo } = useReadStakingUserInfo({
    args: [BigInt(0), address!]
  });

  const { writeContract: unstakeNFTs, isPending } = useWriteStakingLeaveMany();

  useEffect(() => {
    if (refreshTrigger) {
      // Refresh staked NFTs when trigger changes
      setSelectedNFTs([]);
    }
  }, [refreshTrigger]);

  const handleUnstake = async () => {
    if (!address || selectedNFTs.length === 0) return;

    try {
      await unstakeNFTs({
        args: [BigInt(0), selectedNFTs.map(id => BigInt(id))],
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

  const mappedStakedNFTs = stakedNFTs?.map(nft => ({
    id: nft.toString(),
    tokenId: nft.toString(),
    contract: "0x77f649385ca963859693c3d3299d36dfc7324eb9",
    is_staked: true
  })) || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">
          Staked NFTs ({mappedStakedNFTs.length})
        </h3>
      </div>

      {isLoading ? (
        <div className="grid place-items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      ) : mappedStakedNFTs.length === 0 ? (
        <div className="text-center py-12 text-white/60">
          No staked NFTs found
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mappedStakedNFTs.map((nft) => (
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
        disabled={selectedNFTs.length === 0 || !address || isPending || isWaiting}
        className="w-full"
      >
        {isPending || isWaiting ? 'Unstaking...' : `Unstake Selected (${selectedNFTs.length})`}
      </Button>
    </div>
  );
};

export default UnstakeTab;