import React, { useEffect } from 'react';
import PageTitle from '@src/components/common/PageTitle';

const StakeApesPage: React.FC = () => {
  useEffect(() => {
    document.title = "Stake Apes | Staking";
  }, []);

  return (
    <div className="min-h-screen bg-backgroundDark">
      <PageTitle>Stake Apes</PageTitle>
      <div className="container mx-auto px-4 py-16">
        {/* Content goes here */}
      </div>
    </div>
  );
};

export default StakeApesPage; 