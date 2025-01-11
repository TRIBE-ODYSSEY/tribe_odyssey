import React, { useState, useEffect } from 'react';
import NFTCard from '../NFTCard';
import Button from '@src/components/common/Button';
import { useAccount } from 'wagmi';
import { useContractWrite } from '@src/lib/wagmi/hooks';
import { toast } from 'react-toastify';
import { stakingABI } from '@src/lib/config/abi/staking.json';

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
  const [isLoading, setIsLoading] = useState(true);
  const [stakedNFTs, setStakedNFTs] = useState<any[]>([]);
  
  const { write: unstakeNFTs, isLoading: isPending } = useContractWrite({
    address: '0x77f649385ca963859693c3d3299d36dfc7324eb9',  // Your staking contract address
    config: {
      abi: stakingABI
    },
    functionName: 'leaveMany'
  });

  useEffect(() => {
    if (address) {
      fetchStakedNFTs();
    }
  }, [address, refreshTrigger]);

  const fetchStakedNFTs = async () => {
    setIsLoading(true);
    try {
      // Replace with your actual API call
      const response = await fetch(`/api/nfts/staked/${address}`);
      const data = await response.json();
      setStakedNFTs(data);
    } catch (error) {
      console.error('Failed to fetch staked NFTs:', error);
      toast.error('Failed to load staked NFTs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnstake = async () => {
    if (!address || selectedNFTs.length === 0) return;

    try {
      await unstakeNFTs({
        args: [BigInt(0), selectedNFTs.map(id => BigInt(id))],
      });
      
      await onUnstake(selectedNFTs);
      toast.success('NFTs unstaked successfully!');
      setSelectedNFTs([]);
      fetchStakedNFTs();
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

      {isLoading ? (
        <div className="grid place-items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      ) : stakedNFTs.length === 0 ? (
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
        disabled={selectedNFTs.length === 0 || !address || isPending || isWaiting}
        className="w-full"
      >
        {isPending || isWaiting ? 'Unstaking...' : `Unstake Selected (${selectedNFTs.length})`}
      </Button>
    </div>
  );
};

export default UnstakeTab;