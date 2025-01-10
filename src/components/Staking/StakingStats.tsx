import React from 'react';
import Card from '@src/components/common/card/Card';
import { useAccount } from 'wagmi';
import { useReadStakingUserStakedNfTs } from '@src/generated';

const StakingStats: React.FC = () => {
  const { address } = useAccount();
  const { data: userStakedNFTs } = useReadStakingUserStakedNfTs({
    args: [address!],
    enabled: !!address,
  });

  const stats = [
    { label: 'Total Staked', value: userStakedNFTs?.length || '0' },
    { label: 'Total NANA', value: (userStakedNFTs?.length || 0) * 10 },
    { label: 'Your Staked', value: userStakedNFTs?.length || '0' },
    { label: 'Your NANA/Day', value: (userStakedNFTs?.length || 0) * 10 },
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