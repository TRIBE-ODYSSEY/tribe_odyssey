import React, { useEffect } from 'react';
import PageTitle from '@src/components/common/PageTitle';
const RafflesPage: React.FC = () => {
  useEffect(() => {
    document.title = "Raffles | Staking";
  }, []);

  return (
    <div className="min-h-screen bg-backgroundDark">
      <PageTitle>Raffles</PageTitle>
      <div className="container mx-auto px-4 py-16">
        {/* Content goes here */}
      </div>
    </div>
  );
};

export default RafflesPage; 