import React, { useEffect, useState } from 'react';
import Card from '@src/components/common/card/Card';
import { useAlchemy } from '@src/lib/hooks/useAlchemy';
import { getContractConfig } from '@src/lib/viem/contracts';
import { CHAIN_IDS, CONTRACT_NAMES } from '@src/lib/viem/contracts';
import { ethers } from 'ethers';

const StakingStats: React.FC = () => {
  const { address, getSigner } = useAlchemy();
  const [stats, setStats] = useState({
    totalStaked: 0,
    userTotalNFTs: 0,
    userStakedCount: 0,
    userDailyRewards: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!address) return;

      try {
        const signer = await getSigner();
        const { address: stakingAddress, abi: stakingABI } = getContractConfig(CONTRACT_NAMES.STAKING, CHAIN_IDS.MAINNET);
        const { address: tribeAddress, abi: tribeABI } = getContractConfig(CONTRACT_NAMES.TRIBE, CHAIN_IDS.MAINNET);
        
        const stakingContract = new ethers.Contract(stakingAddress, stakingABI, signer);
        const tribeContract = new ethers.Contract(tribeAddress, tribeABI, signer);

        if (!stakingContract.getUserStakedNFTs) {
          throw new Error('Contract method getUserStakedNFTs not found');
        }

        if (!tribeContract.balanceOf) {
          throw new Error('Contract method balanceOf not found');
        }

        if (!stakingContract.getPoolInfo) {
          throw new Error('Contract method getPoolInfo not found');
        }
        
        // Get user's staked NFTs
        const stakedNFTs = await stakingContract.getUserStakedNFTs(address);
        
        // Get total NFT balance
        const nftBalance = await tribeContract.balanceOf(address);

        // Get pool information
        const poolInfo = await stakingContract.getPoolInfo(0);

        // Calculate stats
        const dailyRewardsPerNFT = 10; // This should come from contract or config
        const totalStaked = poolInfo ? Number(poolInfo.totalStaked) : 0;
        const userStakedCount = stakedNFTs.length;
        const userDailyRewards = userStakedCount * dailyRewardsPerNFT;
        const userTotalNFTs = Number(nftBalance);

        setStats({
          totalStaked,
          userTotalNFTs,
          userStakedCount,
          userDailyRewards
        });

      } catch (error) {
        console.error('Error fetching staking stats:', error);
      }
    };

    fetchStats();
  }, [address, getSigner]);

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