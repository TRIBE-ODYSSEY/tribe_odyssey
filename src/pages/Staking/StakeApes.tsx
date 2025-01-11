import React, { useState } from 'react';
import PageTitle from '@src/components/common/PageTitle';
import StakingStats from '@src/components/Staking/StakingStats';
import StakingTabs from '@src/components/Staking/StakingTabs';
import PageLayout from '@src/components/common/layout/PageLayout';
import { useAccount, useSignMessage } from 'wagmi';
import axios from 'axios';
import { toast } from 'react-toastify';

const StakeApes: React.FC = () => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [waiting, setWaiting] = useState(false);

  const handleStake = async (selectedNFTs: string[]) => {
    if (selectedNFTs.length === 0) {
      toast.error("Please select Apes to stake!");
      return;
    }

    if (!address) {
      toast.error("Please connect wallet to stake!");
      return;
    }

    const msg = JSON.stringify({
      ids: selectedNFTs,
      address: address.toLowerCase(),
    });

    setWaiting(true);
    try {
      const signature = await signMessageAsync({
        message: msg,
      });
      
      const response = await axios.post("/staking/stake", {
        address,
        signature,
        ids: selectedNFTs,
      });
      
      toast.success(`${response.data.staked.length} nft(s) have been staked successfully!`);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to stake NFTs");
    } finally {
      setWaiting(false);
    }
  };

  const handleUnstake = async (selectedNFTs: string[]) => {
    if (selectedNFTs.length === 0) {
      toast.error("Please select Apes to unstake!");
      return;
    }

    if (!address) {
      toast.error("Please connect wallet to unstake!");
      return;
    }

    const msg = JSON.stringify({
      ids: selectedNFTs,
      address: address.toLowerCase(),
    });

    setWaiting(true);
    try {
      const signature = await signMessageAsync({
        message: msg,
      });
      
      const response = await axios.post("/staking/unstake", {
        address,
        signature,
        ids: selectedNFTs,
      });
      
      toast.success(`${response.data.unstaked.length} nft(s) have been unstaked successfully!`);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to unstake NFTs");
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
          
          <StakingStats refreshTrigger={refreshTrigger} />
          
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