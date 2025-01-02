import React, { useEffect } from 'react';
import PageLayout from '@src/components/common/layout/PageLayout';
import PageTitle from '@src/components/common/PageTitle';

const CouncilPage: React.FC = () => {
  useEffect(() => {
    document.title = "The Council";
  }, []);

  return (
    <PageLayout>
      <PageTitle>The Council</PageTitle>
      <div className="container mx-auto px-4 py-16">
        {/* Content goes here */}
      </div>
    </PageLayout>
  );
};

export default CouncilPage; 