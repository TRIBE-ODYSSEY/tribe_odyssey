import React, { useEffect } from 'react';

const CouncilPage: React.FC = () => {
  useEffect(() => {
    document.title = "The Council";
  }, []);

  return (
    <div className="min-h-screen bg-backgroundDark">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white/90 mb-8">The Council</h1>
        {/* Content goes here */}
      </div>
    </div>
  );
};

export default CouncilPage; 