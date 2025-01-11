import React, { useState } from 'react';
import Card from '@src/components/common/card/Card';
import Button from '@src/components/common/Button';
// @ts-ignore
import { useAccount } from 'wagmi';
import { useWriteStakingLeaveMany, useReadStakingUserStakedNfTs } from '@src/generated';
import { toast } from 'react-toastify';

const UnstakeTab: React.FC = () => {
  const { address } = useAccount();
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);
  
  const { data: stakedNFTs } = useReadStakingUserStakedNfTs({
    args: [address!, '0x0'],
    enabled: !!address,
  });

  const { writeContract: unstakeNFTs, isPending } = useWriteStakingLeaveMany();

  const handleUnstake = async () => {
    try {
      await unstakeNFTs({
        args: [BigInt(selectedNFTs[0])],
      });
      toast.success('NFTs unstaked successfully!');
      setSelectedNFTs([]);
    } catch (error) {
      toast.error('Failed to unstake NFTs');
      console.error(error);
    }
  };

  const mappedStakedNFTs = stakedNFTs?.map(nft => ({
    id: nft.toString(),
    image: `/images/tribe-nft-${nft.toString()}.png`,
    stakedAt: new Date().toISOString(),
    earnedNANA: 150 // This should be calculated based on staking duration
  })) || [];

  const toggleNFT = (id: string) => {
    setSelectedNFTs(prev => 
      prev.includes(id) 
        ? prev.filter(nftId => nftId !== id)
        : [...prev, id]
    );
  };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
        {mappedStakedNFTs.map((nft) => (
          <div
            key={nft.id}
            onClick={() => toggleNFT(nft.id)}
            className={`cursor-pointer transition-all duration-300 ${
              selectedNFTs.includes(nft.id) ? 'ring-2 ring-red-500' : ''
            }`}
          >
            <Card
              image={{
                'data-src': nft.image,
                alt: `Tribe NFT #${nft.id}`,
              }}
              className="aspect-square"
            >
              <div className="p-2 text-xs text-white/70">
                <p>Earned: {nft.earnedNANA} NANA</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
      
      <Button
        onClick={handleUnstake}
        disabled={selectedNFTs.length === 0 || !address || isPending}
        className="w-full"
      >
        {isPending ? 'Unstaking...' : `Unstake Selected (${selectedNFTs.length})`}
      </Button>
    </div>
  );
};

export default UnstakeTab;