import React, { useEffect } from 'react';
import PageTitle from '@src/components/common/PageTitle';

const MoltenPage: React.FC = () => {
  useEffect(() => {
    document.title = "Molten | Assets";
  }, []);

  return (
    <div className="min-h-screen bg-backgroundDark">
      <div className="container mx-auto px-4 pt-20">
        <PageTitle>Molten</PageTitle>
        {/* Content goes here */}
      </div>
    </div>
  );
};

export default MoltenPage;
