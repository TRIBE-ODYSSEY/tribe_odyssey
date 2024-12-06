import React from 'react';
import { StakeCard } from './StakeCard';

export const StakingDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StakeCard />
    </div>
  );
};