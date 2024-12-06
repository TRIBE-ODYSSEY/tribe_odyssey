import React from 'react';
import { useAccount, useBalance } from 'wagmi';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Coins, Lock } from 'lucide-react';

export const StakeCard = () => {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
  });

  return (
    <Card className="w-full max-w-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Coins className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold">Stake NFTs</h2>
        </div>
        <Lock className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Available to Stake</p>
          <p className="text-2xl font-bold">{balance?.formatted || '0'} ETH</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Currently Staked</p>
          <p className="text-2xl font-bold">0 NFTs</p>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => {}}
            className="flex-1 bg-primary text-white hover:bg-primary-dark"
          >
            Stake
          </Button>
          <Button
            onClick={() => {}}
            className="flex-1 bg-secondary text-white hover:bg-secondary-dark"
          >
            Unstake
          </Button>
        </div>
      </div>
    </Card>
  );
};