import React, { useEffect } from 'react';
import PageTitle from '@src/components/common/PageTitle';
import PageLayout from '@src/components/common/layout/PageLayout';
import { LockClosedIcon } from '@heroicons/react/24/solid';

const MoltenPage: React.FC = () => {
  useEffect(() => {
    document.title = "Molten | Assets";
  }, []);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 pt-20 relative">
        <PageTitle>
          <span className="bg-gradient-to-b from-[var(--color-text-primary)] to-[var(--color-text-primary)]/0 
                         bg-clip-text text-transparent">
            Molten
          </span>
        </PageTitle>
        
        <div className="min-h-[60vh] flex flex-col items-center justify-center 
                     bg-[var(--color-overlay-dark)] backdrop-blur-lg rounded-2xl p-8">
          <LockClosedIcon className="w-20 h-20 text-[var(--color-button-primary)] mb-6 animate-pulse" />
          <h2 className="text-4xl font-bold text-[var(--color-text-on-dark)] mb-4">Coming Soon</h2>
          <p className="text-[var(--color-text-on-dark)]/70 text-lg text-center max-w-md">
            A new molten experience is being forged. Stay tuned for updates.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default MoltenPage;
