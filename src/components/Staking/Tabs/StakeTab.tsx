import React, { useState, useEffect } from 'react';
import NFTCard from '../NFTCard';
import Button from '@src/components/common/Button';
// @ts-ignore
import { useAccount } from 'wagmi';
import { useWriteStakingJoinMany, useReadStakingUserStakedNfTs } from '@src/generated';
import { toast } from 'react-toastify';

interface NFT {
  id: string;
  tokenId: string;
  contract: string;
  is_staked: boolean;
}

interface StakeTabProps {
  onStake: (selectedNFTs: string[]) => Promise<void>;
  isWaiting: boolean;
  refreshTrigger: number;
}

const StakeTab: React.FC<StakeTabProps> = ({
  onStake: _onStake, // Prefix with _ to indicate intentionally unused
  isWaiting,
  refreshTrigger
}) => {
  const { address } = useAccount();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const { writeContract: stakeNFTs } = useWriteStakingJoinMany();
  const { data: _stakedNFTs } = useReadStakingUserStakedNfTs({
    args: [address!, '0x0']
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
      
      toast.success('NFTs staked successfully!');
      setSelectedNFTs([]);
      fetchUnstakedNFTs(); // Refresh NFT list
    } catch (error) {
      console.error('Staking error:', error);
      toast.error('Failed to stake NFTs');
    }
  };

  const fetchUnstakedNFTs = async () => {
    setLoading(true);
    try {
      // Replace with your actual API call
      const response = await fetch('/api/nfts/unstaked');
      const data = await response.json();
      setNfts(data);
    } catch (error) {
      console.error('Failed to fetch NFTs:', error);
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
    if (selectedNFTs.length === nfts.length) {
      setSelectedNFTs([]);
    } else {
      setSelectedNFTs(nfts.map(nft => nft.id));
    }
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

          <div className="flex justify-between items-center pt-4 border-t border-white/10">
            <span className="text-white/60">
              Selected: {selectedNFTs.length} of {nfts.length}
            </span>
            <Button
              onClick={handleStake}
              disabled={selectedNFTs.length === 0 || isWaiting}
              className="min-w-[120px]"
            >
              {isWaiting ? 'Staking...' : 'Stake'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default StakeTab;