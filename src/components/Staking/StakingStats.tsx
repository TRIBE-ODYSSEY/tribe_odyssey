import React from 'react';
import Card from '@src/components/common/card/Card';
import { getStakingAddress, getTribeAddress } from '@src/utils/address';
import stakingABI from '@src/lib/config/abi/staking.json';
import tribeABI from '@src/lib/config/abi/tribe.json';
import { useAccount, useReadContracts } from 'wagmi';


const StakingStats: React.FC = () => {
  const { address } = useAccount();
  
  const stakingConfig = getStakingAddress();
  const tribeConfig = getTribeAddress();

  const { data } = useReadContracts({
    contracts: [
      {
        ...stakingConfig,
        abi: stakingABI,
        functionName: 'poolInfo',
        args: [0n]
      },
      {
        ...stakingConfig,
        abi: stakingABI,
        functionName: 'getUserStakedNFTs',
        args: [address],
      },
      {
        ...tribeConfig,
        abi: tribeABI,
        functionName: 'balanceOf',
        args: [address],
      }
    ],
    query: {
      enabled: !!address,
    }
  });

  const [poolInfo, stakedNFTs] = (data?.map(d => d.result) || []) as [
    [bigint, bigint, bigint, boolean, boolean, bigint[]],
    bigint[],
  ];
  const dailyRewardsPerNFT = 10; // This should come from contract or config

  const stats = {
    totalStaked: poolInfo ? Number(poolInfo[2]) : 0,
    userTotalNFTs: stakedNFTs ? Number(stakedNFTs) : 0,
    userStakedCount: stakedNFTs ? Number(stakedNFTs) : 0,
    userDailyRewards: (stakedNFTs ? Number(stakedNFTs) : 0) * dailyRewardsPerNFT
  };

  const statsConfig = [
    { 
      label: 'Total Staked', 
      value: stats.totalStaked.toLocaleString(),
      tooltip: 'Total number of NFTs staked in the protocol'
    },
    { 
      label: 'Your Total NFTs', 
      value: stats.userTotalNFTs.toLocaleString(),
      tooltip: 'Total number of NFTs you own'
    },
    { 
      label: 'Your Staked', 
      value: stats.userStakedCount.toLocaleString(),
      tooltip: 'Number of NFTs you have staked'
    },
    { 
      label: 'Your NANA/Day', 
      value: stats.userDailyRewards.toLocaleString(),
      tooltip: 'Your daily NANA rewards'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statsConfig.map((stat) => (
        <Card
          key={stat.label}
          className="p-4 bg-[var(--color-overlay-dark)]/5 hover:bg-[var(--color-overlay-dark)]/10 
                   backdrop-blur-sm transition-all duration-300"
          data-tooltip={stat.tooltip}
        >
          <div className="text-center">
            <p className="text-[var(--color-text-muted)] text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-[var(--color-button-primary)] 
                       to-[var(--color-button-hover)] bg-clip-text text-transparent">
              {stat.value}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StakingStats;