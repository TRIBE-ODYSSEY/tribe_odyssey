import React, { useState } from 'react';
import NFTCard from '../NFTCard';
import Button from '@src/components/common/Button';
import { useAccount } from 'wagmi';
import { useReadContract, useWriteContract } from 'wagmi';
import { getStakingContract, getTribeContract } from '@src/lib/viem/helpers/contracts';
import { CHAIN_IDS } from '@src/lib/viem/contracts';
import { toast } from 'react-toastify';

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
  const tribeContract = getTribeContract(CHAIN_IDS.MAINNET);
  const stakingContract = getStakingContract(CHAIN_IDS.MAINNET);

  // Get approval status
  const { data: isApproved } = useReadContract({
    ...tribeContract,
    functionName: 'isApprovedForAll',
    args: [address, stakingContract.address],
    enabled: Boolean(address),
  });

  // Get user's NFT balance
  const { data: nfts = [] } = useReadContract({
    ...tribeContract,
    functionName: 'tokensOfOwner',
    args: [address],
    enabled: Boolean(address),
  });

  const { writeContractAsync: approve } = useWriteContract();
  const { writeContractAsync: stake } = useWriteContract();

  const handleApprove = async () => {
    if (!address) return;

    try {
      await approve({
        ...tribeContract,
        functionName: 'setApprovalForAll',
        args: [stakingContract.address, true],
        address: tribeContract.address as `0x${string}`,
      });
      toast.success('Approval granted successfully!');
    } catch (error) {
      console.error('Approval error:', error);
      toast.error('Failed to approve staking contract');
    }
  };

  const handleStake = async () => {
    if (!address || selectedNFTs.length === 0) return;

    try {
      await stake({
        ...stakingContract,
        functionName: 'joinMany',
        args: [BigInt(0), selectedNFTs.map(id => BigInt(id))],
        address: stakingContract.address as `0x${string}`,
      });
      
      await onStake(selectedNFTs);
      toast.success('NFTs staked successfully!');
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
      prev.length === nfts.length ? [] : nfts.map(nft => nft.id)
    );
  };

  return (
    <div className="space-y-6">
      {!isApproved ? (
        <Button
          onClick={handleApprove}
          disabled={!address || isWaiting}
          className="w-full"
        >
          Approve Staking Contract
        </Button>
      ) : (
        <>
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
            disabled={selectedNFTs.length === 0 || !address || isWaiting}
            className="w-full"
          >
            {isWaiting ? 'Staking...' : `Stake Selected (${selectedNFTs.length})`}
          </Button>
        </>
      )}
    </div>
  );
};

export default StakeTab;