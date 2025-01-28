import React, { useEffect } from 'react';
import PageTitle from '@src/components/common/PageTitle';
import StakingStats from '@src/components/Staking/StakingStats';
import StakingTabs from '@src/components/Staking/StakingTabs';
import PageLayout from '@src/components/common/layout/PageLayout';
import { toast } from 'react-toastify';
import { getStakingAddress } from '@src/utils/address';
import { useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi';
import stakingABI from '@src/lib/config/abi/staking.json';

const StakeApes: React.FC = () => {
  const { address } = useAccount();
  
  const { writeContract: writeStake, data: stakeHash } = useWriteContract();

  const { writeContract: writeUnstake, data: unstakeHash } = useWriteContract();

  const { data: receipt, isLoading: isStaking } = useWaitForTransactionReceipt({
    hash: stakeHash,
  });

  useEffect(() => {
    if (receipt) {
      toast.success(`Successfully staked NFT(s)`);
    }
  }, [receipt]);

  const { data: unstakeReceipt, isLoading: isUnstaking } = useWaitForTransactionReceipt({
    hash: unstakeHash,
  });

  useEffect(() => {
    if (unstakeReceipt) {
      toast.success(`Successfully unstaked NFT(s)`);
    }
  }, [unstakeReceipt]);

  const handleStake = async (selectedNFTs: string[]) => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }
    
    if (selectedNFTs.length === 0) {
      toast.error("Please select NFTs to stake");
      return;
    }

    try {
      writeStake({
        address: getStakingAddress().address,
        abi: stakingABI,
        functionName: 'joinMany',
        args: [0n, selectedNFTs.map(id => BigInt(id))]
      });
    } catch (error) {
      console.error('Staking error:', error);
      toast.error('Failed to stake NFTs');
    }
  };

  const handleUnstake = async (selectedNFTs: string[]) => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }
    
    if (selectedNFTs.length === 0) {
      toast.error("Please select NFTs to unstake");
      return;
    }

    try {
      writeUnstake({
        address: getStakingAddress().address,
        abi: stakingABI,
        functionName: 'leaveMany',
        args: [0n, selectedNFTs.map(id => BigInt(id))]
      });
    } catch (error) {
      console.error('Unstaking error:', error);
      toast.error('Failed to unstake NFTs');
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <PageTitle>Stake Apes</PageTitle>
          
          <div className="mb-8 p-4 rounded-xl bg-[var(--color-overlay-dark)]/10 
                        border border-[var(--color-text-primary)]/10 backdrop-blur-sm">
            <p className="text-center text-[var(--color-text-on-dark)]">
              Earn 10 NANA Points per day for each staked Tribe Ape
            </p>
          </div>
          
          <div className="space-y-8">
            <StakingStats />
            
            <div className="bg-[var(--color-overlay-dark)]/5 backdrop-blur-sm 
                          rounded-xl border border-[var(--color-text-primary)]/10 
                          overflow-hidden">
              <StakingTabs 
                onStake={handleStake}
                onUnstake={handleUnstake}
                isWaiting={isStaking || isUnstaking}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default StakeApes;