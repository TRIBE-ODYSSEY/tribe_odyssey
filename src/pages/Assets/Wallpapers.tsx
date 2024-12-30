import React, { useEffect } from 'react';

const WallpapersPage: React.FC = () => {
  useEffect(() => {
    document.title = "Wallpapers | Assets";
  }, []);

  return (
    <div className="min-h-screen bg-backgroundDark">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white/90 mb-8">Wallpapers</h1>
        {/* Content goes here */}
      </div>
    </div>
  );
};

export default WallpapersPage;
