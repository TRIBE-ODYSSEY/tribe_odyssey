import React, { useEffect } from 'react';
import PageTitle from '@src/components/common/PageTitle';
import PageLayout from '@src/components/common/layout/PageLayout';

const WallpapersPage: React.FC = () => {
  useEffect(() => {
    document.title = "Wallpapers | Assets";
  }, []);

  return (
    <PageLayout>
      <PageTitle>Wallpapers</PageTitle>
      <div className="container mx-auto px-4 py-16">
        {/* Content goes here */}
      </div>
    </PageLayout>
  );
};

export default WallpapersPage;
