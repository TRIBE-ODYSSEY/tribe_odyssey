import React, { useState, useEffect } from 'react';
import NFTCard from '../NFTCard';
import Button from '@src/components/common/Button';
import { useAccount } from 'wagmi';
import { useContractWrite } from '@src/lib/wagmi/hooks';
import { toast } from 'react-toastify';
import { stakingABI } from '@src/lib/config/abi/staking.json';

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
  const { address } = useAccount();
  const [nfts, setNfts] = useState<any[]>([]);
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const { write: stakeNFTs, isLoading: isPending } = useContractWrite({
    address: '0x77f649385ca963859693c3d3299d36dfc7324eb9',  // Your staking contract address
    functionName: 'joinMany',
    config: {
      abi: stakingABI
    }
  });

  useEffect(() => {
    if (address) {
      fetchUnstakedNFTs();
    }
  }, [address, refreshTrigger]);

  const handleStake = async () => {
    if (!address || selectedNFTs.length === 0) return;

    try {
      await stakeNFTs({
        args: [BigInt(0), selectedNFTs.map(id => BigInt(id))],
      });
      
      await onStake(selectedNFTs);
      toast.success('NFTs staked successfully!');
      setSelectedNFTs([]);
      fetchUnstakedNFTs();
    } catch (error) {
      console.error('Staking error:', error);
      toast.error('Failed to stake NFTs');
    }
  };

  const fetchUnstakedNFTs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/nfts/unstaked/${address}`);
      const data = await response.json();
      setNfts(data);
    } catch (error) {
      console.error('Failed to fetch NFTs:', error);
      toast.error('Failed to load NFTs');
    } finally {
      setLoading(false);
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
      prev.length === nfts.length ? [] : nfts.map(nft => nft.id)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">
          Available NFTs ({nfts.length})
        </h3>
        <button
          onClick={selectAll}
          className="text-red-400 hover:text-red-300 transition-colors"
        >
          {selectedNFTs.length === nfts.length ? 'Deselect All' : 'Select All'}
        </button>
      </div>

      {loading ? (
        <div className="grid place-items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      ) : nfts.length === 0 ? (
        <div className="text-center py-12 text-white/60">
          No NFTs available to stake
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {nfts.map((nft) => (
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

          <Button
            onClick={handleStake}
            disabled={selectedNFTs.length === 0 || !address || isPending || isWaiting}
            className="w-full"
          >
            {isPending || isWaiting ? 'Staking...' : `Stake Selected (${selectedNFTs.length})`}
          </Button>
        </>
      )}
    </div>
  );
};

export default StakeTab;