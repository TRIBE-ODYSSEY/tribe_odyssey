import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import StakeTab from '@src/components/Staking/Tabs/StakeTab';
import UnstakeTab from '@src/components/Staking/Tabs/UnstakeTab';

const StakingTabs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-2 rounded-xl bg-white/5 p-1 mb-6">
          {['Stake', 'Unstake'].map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                 ${selected 
                   ? 'bg-red-500 text-white shadow'
                   : 'text-white/60 hover:bg-white/[0.12] hover:text-white'
                 } transition-all duration-200`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <StakeTab />
          </Tab.Panel>
          <Tab.Panel>
            <UnstakeTab />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default StakingTabs;