import PageTitle from '@src/components/common/PageTitle';
import StakingStats from '@src/components/Staking/StakingStats';
import StakingTabs from '@src/components/Staking/StakingTabs';
import PageLayout from '@src/components/common/layout/PageLayout';
import React from 'react';

const StakeApes: React.FC = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <PageTitle>Stake Apes</PageTitle>
          
          {/* Info Banner */}
          <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <p className="text-center text-white/80">
              Earn 10 NANA Points per day for each staked Tribe NFT
            </p>
          </div>
          
          {/* Stats Section */}
          <StakingStats />
          
          {/* Main Staking Interface */}
          <StakingTabs />
        </div>
      </div>
    </PageLayout>
  );
};

export default StakeApes;