import React, { useState } from 'react';
import Card from '@src/components/common/card/Card';
import Button from '@src/components/common/Button';
// @ts-ignore
import { useAccount } from 'wagmi';
import { useWriteStakingJoinMany } from '@src/generated';
import { toast } from 'react-toastify';

interface NFT {
  id: string;
  image: string;
}

const StakeTab: React.FC = () => {
  const { address } = useAccount();
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);
  
  const { writeContract: stakeNFTs, isPending } = useWriteStakingJoinMany();

  const handleStake = async () => {
    try {
      await stakeNFTs({
        args: [BigInt(selectedNFTs[0])],
      });
      toast.success('NFTs staked successfully!');
      setSelectedNFTs([]);
    } catch (error) {
      toast.error('Failed to stake NFTs');
      console.error(error);
    }
  };

  const availableNFTs: NFT[] = [];

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
        {availableNFTs.map((nft) => (
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
            />
          </div>
        ))}
      </div>
      
      <Button
        onClick={handleStake}
        disabled={selectedNFTs.length === 0 || !address || isPending}
        className="w-full"
      >
        {isPending ? 'Staking...' : `Stake Selected (${selectedNFTs.length})`}
      </Button>
    </div>
  );
};

export default StakeTab;