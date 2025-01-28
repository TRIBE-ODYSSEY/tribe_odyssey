import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import StakeTab from '@src/components/Staking/Tabs/StakeTab';
import UnstakeTab from '@src/components/Staking/Tabs/UnstakeTab';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { getStakingAddress } from '@src/utils/address';
import stakingABI from '@src/lib/config/abi/staking.json';

interface StakingTabsProps {
  onStake: (selectedNFTs: string[]) => Promise<void>;
  onUnstake: (selectedNFTs: string[]) => Promise<void>;
  isWaiting: boolean;
}

const StakingTabs: React.FC<StakingTabsProps> = ({
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { writeContract: writeStake, data: stakeHash } = useWriteContract();
  const { writeContract: writeUnstake, data: unstakeHash } = useWriteContract();
  
  const handleStake = async (selectedNFTs: string[]) => {
    writeStake({
      address: getStakingAddress().address,
      abi: stakingABI,
      functionName: 'joinMany',
      args: [0n, selectedNFTs.map(id => BigInt(id))]
    });
  };

  const handleUnstake = async (selectedNFTs: string[]) => {
    writeUnstake({
      address: getStakingAddress().address,
      abi: stakingABI,
      functionName: 'leaveMany',
      args: [0n, selectedNFTs.map(id => BigInt(id))]
    });
  };

  // Transaction receipts
  const { isLoading: isStaking } = useWaitForTransactionReceipt({
    hash: stakeHash,
  });

  const { isLoading: isUnstaking } = useWaitForTransactionReceipt({
    hash: unstakeHash,
  });

  return (
    <div className="bg-[var(--color-overlay-dark)]/5 backdrop-blur-sm rounded-xl 
                  border border-[var(--color-text-primary)]/10 p-6">
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-2 rounded-xl bg-[var(--color-overlay-dark)]/10 p-1 mb-6">
          {['Stake', 'Unstake'].map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                 ${selected 
                   ? 'bg-[var(--color-button-primary)] text-[var(--color-text-on-primary)] shadow'
                   : 'text-[var(--color-text-muted)] hover:bg-[var(--color-overlay-dark)]/20 hover:text-[var(--color-text-primary)]'
                 } transition-all duration-200`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <StakeTab 
              onStake={handleStake}
              isWaiting={isStaking}
            />
          </Tab.Panel>
          <Tab.Panel>
            <UnstakeTab 
              onUnstake={handleUnstake}
              isWaiting={isUnstaking}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default StakingTabs;