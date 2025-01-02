import React, { useEffect } from 'react';
import PageTitle from '@src/components/common/PageTitle';
import PageLayout from '@src/components/common/layout/PageLayout';

const ENSPage: React.FC = () => {
  useEffect(() => {
    document.title = "ENS | Assets";
  }, []);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 pt-20">
        <PageTitle>ENS</PageTitle>
        {/* Content goes here */}
        
      </div>
    </PageLayout>
  );
};

export default ENSPage;
