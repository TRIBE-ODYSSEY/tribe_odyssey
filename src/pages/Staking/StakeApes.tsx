import React, { useState } from 'react';
import PageTitle from '@src/components/common/PageTitle';
import StakingStats from '@src/components/Staking/StakingStats';
import StakingTabs from '@src/components/Staking/StakingTabs';
import PageLayout from '@src/components/common/layout/PageLayout';
import { useAccount } from 'wagmi';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { getStakingFunctions } from '@src/lib/viem/helpers/contracts';
import { CHAIN_IDS } from '@src/lib/viem/contracts';
import { toast } from 'react-toastify';

const StakeApes: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [waiting, setWaiting] = useState(false);
  
  const { writeContractAsync } = useWriteContract();

  const handleStake = async (selectedNFTs: string[]) => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet");
      return;
    }

    if (selectedNFTs.length === 0) {
      toast.error("Please select NFTs to stake");
      return;
    }

    setWaiting(true);
    try {
      const stakingFunctions = getStakingFunctions(CHAIN_IDS.MAINNET);
      const config = stakingFunctions.stake(selectedNFTs.map(Number));
      
      const hash = await writeContractAsync(config);
      await useWaitForTransactionReceipt({ hash });
      
      toast.success(`Successfully staked ${selectedNFTs.length} NFT(s)`);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Staking error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to stake NFTs");
    } finally {
      setWaiting(false);
    }
  };

  const handleUnstake = async (selectedNFTs: string[]) => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet");
      return;
    }

    if (selectedNFTs.length === 0) {
      toast.error("Please select NFTs to unstake");
      return;
    }

    setWaiting(true);
    try {
      const stakingFunctions = getStakingFunctions(CHAIN_IDS.MAINNET);
      const config = stakingFunctions.unstake(selectedNFTs.map(Number));
      
      const hash = await writeContractAsync(config);
      await useWaitForTransactionReceipt({ hash });
      
      toast.success(`Successfully unstaked ${selectedNFTs.length} NFT(s)`);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Unstaking error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to unstake NFTs");
    } finally {
      setWaiting(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <PageTitle>Stake Apes</PageTitle>
          
          <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <p className="text-center text-white/80">
              Earn 10 NANA Points per day for each staked Tribe NFT
            </p>
          </div>
          
          <StakingStats />
          
          <StakingTabs 
            onStake={handleStake}
            onUnstake={handleUnstake}
            isWaiting={waiting}
            refreshTrigger={refreshTrigger}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default StakeApes;