import React from 'react';
import Card from '@src/components/common/card/Card';
import { useAccount } from 'wagmi';
import { useReadContract } from 'wagmi';
import { stakingABI } from '@src/lib/config/abi/staking.json';

const StakingStats: React.FC = () => {
  const { address } = useAccount();

  const { data: userStakedNFTs = [] } = useReadContract({
    address: '0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F',  // Your staking contract address
    abi: stakingABI,
    functionName: 'getUserStakedNfTs',
    args: [address!, '0x0'],
    account: address,
  }) as { data: any[] };  // Type assertion to handle unknown type

  const { data: poolInfo = { 0: BigInt(0) } } = useReadContract({
    address: '0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F',  // Your staking contract address
    abi: stakingABI,
    functionName: 'getPoolInfo',
    args: [BigInt(0)],
  }) as { data: { 0: bigint } };  // Type assertion to handle unknown type

  const stats = [
    { 
      label: 'Total Staked', 
      value: Number(poolInfo[0]).toString()
    },
    { 
      label: 'Total NANA/Day', 
      value: ((userStakedNFTs?.length || 0) * 10).toString()
    },
    { 
      label: 'Your Staked', 
      value: (userStakedNFTs?.length || 0).toString()
    },
    { 
      label: 'Your NANA/Day', 
      value: ((userStakedNFTs?.length || 0) * 10).toString()
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="p-4 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
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