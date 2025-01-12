import React from 'react';
import Card from '@src/components/common/card/Card';
import { useAccount } from 'wagmi';
import { useReadContract } from 'wagmi';
import { getStakingContract, getTribeContract } from '@src/lib/viem/helpers/contracts';
import { CHAIN_IDS } from '@src/lib/viem/contracts';

const StakingStats: React.FC = () => {
  const { address } = useAccount();
  const stakingContract = getStakingContract(CHAIN_IDS.MAINNET);
  const tribeContract = getTribeContract(CHAIN_IDS.MAINNET);

  // Get user's staked NFTs
  const { data: userStakedNFTs = [] } = useReadContract({
    ...stakingContract,
    functionName: 'getUserStakedNFTs',
    args: address ? [address] : undefined,
    enabled: Boolean(address),
  });

  // Get total NFT balance of user
  const { data: totalNFTBalance = BigInt(0) } = useReadContract({
    ...tribeContract,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    enabled: Boolean(address),
  });

  // Get pool information
  const { data: poolInfo = { totalStaked: BigInt(0) } } = useReadContract({
    ...stakingContract,
    functionName: 'getPoolInfo',
    args: [BigInt(0)],
  });

  // Calculate stats
  const dailyRewardsPerNFT = 10;
  const totalStaked = Number(poolInfo.totalStaked);
  const userStakedCount = Array.isArray(userStakedNFTs) ? userStakedNFTs.length : 0;
  const userDailyRewards = userStakedCount * dailyRewardsPerNFT;
  const userTotalNFTs = Number(totalNFTBalance);

  const stats = [
    { 
      label: 'Total Staked', 
      value: totalStaked.toLocaleString(),
      tooltip: 'Total number of NFTs staked in the protocol'
    },
    { 
      label: 'Your Total NFTs', 
      value: userTotalNFTs.toLocaleString(),
      tooltip: 'Total number of NFTs you own'
    },
    { 
      label: 'Your Staked', 
      value: userStakedCount.toLocaleString(),
      tooltip: 'Number of NFTs you have staked'
    },
    { 
      label: 'Your NANA/Day', 
      value: userDailyRewards.toLocaleString(),
      tooltip: 'Your daily NANA rewards'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="p-4 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
          data-tooltip={stat.tooltip}
        >
          <div className="text-center">
            <p className="text-white/70 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              {stat.value}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StakingStats;