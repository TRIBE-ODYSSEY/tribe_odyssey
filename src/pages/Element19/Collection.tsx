import React, { useEffect } from 'react';
import PageTitle from '@src/components/common/PageTitle';
import PageLayout from '@src/components/common/layout/PageLayout';

const CollectionPage: React.FC = () => {
  useEffect(() => {
    document.title = "Collection | Element19";
  }, []);

  return (
    <PageLayout>
      <PageTitle>Collection</PageTitle>
      <div className="container mx-auto px-4 py-16">
        {/* Content goes here */}
      </div>
    </PageLayout>
  );
};

export default CollectionPage; 