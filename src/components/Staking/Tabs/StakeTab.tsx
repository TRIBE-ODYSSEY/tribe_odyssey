import React, { useState, useEffect } from 'react';
import NFTCard from '../NFTCard';
import Button from '@src/components/common/Button';
import { useAccount } from 'wagmi';
import { useReadContract, useWriteContract } from 'wagmi';
import { getStakingContract, getTribeContract } from '@src/lib/viem/helpers/contracts';
import { CHAIN_IDS } from '@src/lib/viem/contracts';
import { toast } from 'react-toastify';
import type { Address } from 'viem';

interface StakeTabProps {
  onStake: (selectedNFTs: string[]) => Promise<void>;
  isWaiting: boolean;
  refreshTrigger: number;
}

interface OwnedToken {
  tokenId: bigint;
}

interface StakedToken {
  tokenId: bigint;
  stakedAt: bigint;
}

const StakeTab: React.FC<StakeTabProps> = ({
  onStake,
  isWaiting,
  refreshTrigger
}) => {
  const { address } = useAccount();
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);
  const tribeContract = getTribeContract(CHAIN_IDS.MAINNET);
  const stakingContract = getStakingContract(CHAIN_IDS.MAINNET);

  // Get approval status
  const { data: isApproved = false } = useReadContract({
    address: tribeContract.address as Address,
    abi: tribeContract.abi,
    functionName: 'isApprovedForAll',
    args: address ? [address as Address, stakingContract.address as Address] : undefined,
    query: {
      enabled: Boolean(address),
    }
  });

  // Get user's NFT balance and token IDs
  const { data: ownedTokens = [] } = useReadContract({
    address: tribeContract.address as Address,
    abi: tribeContract.abi,
    functionName: 'tokensOfOwner',
    args: address ? [address as Address] : undefined,
    query: {
      enabled: Boolean(address),
    }
  }) as { data: OwnedToken[] | undefined };

  // Get user's staked NFTs for status check
  const { data: stakedTokens = [] } = useReadContract({
    address: stakingContract.address as Address,
    abi: stakingContract.abi,
    functionName: 'userStakedNFTs',
    args: address ? [BigInt(0), address as Address] : undefined,
    query: {
      enabled: Boolean(address),
    }
  }) as { data: StakedToken[] | undefined };

  const { writeContract } = useWriteContract();

  const handleApprove = async () => {
    if (!address) return;

    try {
      await writeContract({
        address: tribeContract.address as Address,
        abi: tribeContract.abi,
        functionName: 'setApprovalForAll',
        args: [stakingContract.address as Address, true] as const,
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
      await onStake(selectedNFTs);
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

  // Create a map of staked NFTs for quick lookup
  const stakedTokenMap = new Set(
    (stakedTokens || []).map((token: StakedToken) => token.tokenId.toString())
  );

  const unstaked = (ownedTokens || []).filter((token: OwnedToken) => 
    !stakedTokenMap.has(token.tokenId.toString())
  );

  const selectAll = () => {
    const unstakeIds = unstaked.map((token: OwnedToken) => token.tokenId.toString());
    setSelectedNFTs(prev => 
      prev.length === unstakeIds.length ? [] : unstakeIds
    );
  };

  // Reset selections when refreshTrigger changes
  useEffect(() => {
    setSelectedNFTs([]);
  }, [refreshTrigger]);

  return (
    <div className="space-y-6">
      {!isApproved ? (
        <Button
          onClick={handleApprove}
          disabled={!address || isWaiting}
          className="w-full bg-[var(--color-button-primary)] hover:bg-[var(--color-button-hover)] 
                    text-[var(--color-text-on-primary)]"
        >
          Approve Staking Contract
        </Button>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-[var(--color-text-primary)]">
              Available NFTs ({unstaked.length})
            </h3>
            <button
              onClick={selectAll}
              className="text-[var(--color-button-primary)] hover:text-[var(--color-button-hover)] 
                       transition-colors duration-200"
            >
              {selectedNFTs.length === unstaked.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          {unstaked.length === 0 ? (
            <div className="text-center py-12 text-[var(--color-text-muted)]">
              No unstaked NFTs found
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {unstaked.map((token: OwnedToken) => (
                <NFTCard
                  key={token.tokenId.toString()}
                  tokenId={token.tokenId.toString()}
                  contract={tribeContract.address as Address}
                  isStaked={false}
                  isSelected={selectedNFTs.includes(token.tokenId.toString())}
                  onClick={() => toggleNFT(token.tokenId.toString())}
                />
              ))}
            </div>
          )}

          <Button
            onClick={handleStake}
            disabled={selectedNFTs.length === 0 || !address || isWaiting}
            className="w-full bg-[var(--color-button-primary)] hover:bg-[var(--color-button-hover)] 
                      text-[var(--color-text-on-primary)] disabled:bg-[var(--color-button-disabled)]"
          >
            {isWaiting ? 'Staking...' : `Stake Selected (${selectedNFTs.length})`}
          </Button>
        </>
      )}
    </div>
  );
};

export default StakeTab;