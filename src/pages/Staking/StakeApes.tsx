import React, { useState } from 'react';
import PageTitle from '@src/components/common/PageTitle';
import StakingStats from '@src/components/Staking/StakingStats';
import StakingTabs from '@src/components/Staking/StakingTabs';
import PageLayout from '@src/components/common/layout/PageLayout';
import { useAlchemy } from '@src/lib/hooks';
import { alchemy, alchemyService } from '@src/lib/config/alchemy';
import { toast } from 'react-toastify';
import { getStakingContract } from '@src/lib/viem/helpers/contracts';
import { CHAIN_IDS } from '@src/lib/viem/contracts';

const StakeApes: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const { getNFTs } = useAlchemy();
  
  const stakingContract = getStakingContract(CHAIN_IDS.MAINNET);

  const handleStake = async (selectedNFTs: string[]) => {
    if (selectedNFTs.length === 0) {
      toast.error("Please select NFTs to stake");
      return;
    }

    setWaiting(true);
    try {
      const transaction = await alchemy.transact.sendTransaction({
        to: stakingContract.address as `0x${string}`,
        data: encodeAbiParameters(
          stakingContract.abi,
          'joinMany',
          [BigInt(0), selectedNFTs.map(id => BigInt(id))]
        )
      });
      
      toast.success(`Successfully staked ${selectedNFTs.length} NFT(s)`);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Staking error:', error);
      toast.error('Failed to stake NFTs');
    } finally {
      setWaiting(false);
    }
  };

  const handleUnstake = async (selectedNFTs: string[]) => {
    if (selectedNFTs.length === 0) {
      toast.error("Please select NFTs to unstake");
      return;
    }

    setWaiting(true);
    try {
      const transaction = await alchemy.transact.sendTransaction({
        to: stakingContract.address as `0x${string}`,
        data: encodeAbiParameters(
          stakingContract.abi,
          'leaveMany',
          [BigInt(0), selectedNFTs.map(id => BigInt(id))]
        )
      });
      
      toast.success(`Successfully unstaked ${selectedNFTs.length} NFT(s)`);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Unstaking error:', error);
      toast.error('Failed to unstake NFTs');
    } finally {
      setWaiting(false);
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
                isWaiting={waiting}
                refreshTrigger={refreshTrigger}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default StakeApes;