import React, { useEffect } from 'react';
import PageTitle from '@src/components/common/PageTitle';
import PageLayout from '@src/components/common/layout/PageLayout';

const RafflesPage: React.FC = () => {
  useEffect(() => {
    document.title = "Raffles | Staking";
  }, []);

  return (
    <PageLayout>
      <PageTitle>Raffles</PageTitle>
      <div className="container mx-auto px-4 py-16">
        {/* Content goes here */}
      </div>
    </PageLayout>
  );
};

export default RafflesPage; 