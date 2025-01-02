import React, { useEffect } from 'react';
import PageTitle from '@src/components/common/PageTitle';
import PageLayout from '@src/components/common/layout/PageLayout';

const TribalBeatsPage: React.FC = () => {
  useEffect(() => {
    document.title = "Tribal Beats | Assets";
  }, []);

  return (
    <PageLayout>  
      <PageTitle>Tribal Beats</PageTitle>
      <div className="container mx-auto px-4 py-16">
        {/* Content goes here */}
      </div>
    </PageLayout>
  );
};

export default TribalBeatsPage;