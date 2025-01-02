import React, { useEffect } from 'react';
import PageTitle from '@src/components/common/PageTitle';
import PageLayout from '@src/components/common/layout/PageLayout';

const StakeApesPage: React.FC = () => {
  useEffect(() => {
    document.title = "Stake Apes | Staking";
  }, []);

  return (
    <PageLayout>
      <PageTitle>Stake Apes</PageTitle>
      <div className="container mx-auto px-4 py-16">
        {/* Content goes here */}
      </div>
    </PageLayout>
  );
};

export default StakeApesPage; 