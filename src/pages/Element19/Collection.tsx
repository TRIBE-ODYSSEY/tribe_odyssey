import React, { useEffect } from 'react';
import PageTitle from '@src/components/common/PageTitle';
import PageLayout from '@src/components/common/layout/PageLayout';
import { LockClosedIcon } from '@heroicons/react/24/solid';

const CollectionPage: React.FC = () => {
  useEffect(() => {
    document.title = "Collection | Element19";
  }, []);

  return (
    <PageLayout>
      <PageTitle>Collection</PageTitle>
      <div className="container mx-auto px-4 py-16">
        <div className="min-h-[60vh] flex flex-col items-center justify-center backdrop-blur-lg bg-black/30 rounded-2xl p-8">
          <LockClosedIcon className="w-20 h-20 text-red-600 mb-6 animate-pulse" />
          <h2 className="text-4xl font-bold text-white mb-4">Coming Soon</h2>
          <p className="text-white/70 text-lg text-center max-w-md">
            A new collection is being forged. Stay tuned for updates.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default CollectionPage; 