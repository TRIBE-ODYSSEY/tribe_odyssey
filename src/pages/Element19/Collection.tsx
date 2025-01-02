import React, { useEffect } from 'react';
import PageTitle from '@src/components/common/PageTitle';

const CollectionPage: React.FC = () => {
  useEffect(() => {
    document.title = "Collection | Element19";
  }, []);

  return (
    <div className="min-h-screen bg-backgroundDark">
      <PageTitle>Collection</PageTitle>
      <div className="container mx-auto px-4 py-16">
        {/* Content goes here */}
      </div>
    </div>
  );
};

export default CollectionPage; 