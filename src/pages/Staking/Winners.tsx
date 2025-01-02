import React, { useEffect } from 'react';
import PageTitle from '@src/components/common/PageTitle';

const WinnersPage: React.FC = () => {
  useEffect(() => {
    document.title = "Winners | Staking";
  }, []);

  return (
    <div className="min-h-screen bg-backgroundDark">
      <PageTitle>Winners</PageTitle>
      <div className="container mx-auto px-4 py-16">
        {/* Content goes here */}
      </div>
    </div>
  );
};

export default WinnersPage; 