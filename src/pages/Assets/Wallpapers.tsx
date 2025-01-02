import React, { useEffect } from 'react';
import PageTitle from '@src/components/common/PageTitle';

const WallpapersPage: React.FC = () => {
  useEffect(() => {
    document.title = "Wallpapers | Assets";
  }, []);

  return (
    <div className="min-h-screen bg-backgroundDark">
      <PageTitle>Wallpapers</PageTitle>
      <div className="container mx-auto px-4 py-16">
        {/* Content goes here */}
      </div>
    </div>
  );
};

export default WallpapersPage;
