import React, { useEffect } from 'react';
import PageTitle from '@src/components/common/PageTitle';

const TribalBeatsPage: React.FC = () => {
  useEffect(() => {
    document.title = "Tribal Beats | Assets";
  }, []);

  return (
    <div className="min-h-screen bg-backgroundDark">
      <PageTitle>Tribal Beats</PageTitle>
      <div className="container mx-auto px-4 py-16">
        {/* Content goes here */}
      </div>
    </div>
  );
};

export default TribalBeatsPage;