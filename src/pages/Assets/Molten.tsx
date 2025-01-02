import React, { useEffect } from 'react';
import PageTitle from '@src/components/common/PageTitle';
import PageLayout from '@src/components/common/layout/PageLayout';

const MoltenPage: React.FC = () => {
  useEffect(() => {
    document.title = "Molten | Assets";
  }, []);

  return (
      <PageLayout>
      <div className="container mx-auto px-4 pt-20">
        <PageTitle>Molten</PageTitle>
        {/* Content goes here */}
      </div>
    </PageLayout>
  );
};

export default MoltenPage;
