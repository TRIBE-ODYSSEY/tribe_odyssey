import React, { Suspense, lazy } from 'react';

type SectionComponent = React.LazyExoticComponent<React.ComponentType<any>>;

const lazyLoadSection = (
  importFn: () => Promise<{ default: React.ComponentType<any> }>
) =>
  lazy(async () => {
    try {
      return await importFn();
    } catch (error) {
      console.error('Error loading section:', error);
      throw error;
    }
  });

const sections: SectionComponent[] = [
  // lazyLoadSection(() => import("/components/Home/WelcomeSection")),
  // lazyLoadSection(() => import("/components/Home/TribeOdysseySection")),
  // lazyLoadSection(() => import("/components/Home/WhispersOfLoresSection")),
  // lazyLoadSection(() => import("/components/Home/GoldApesSection")),
  // lazyLoadSection(() => import("/components/Home/TribeAllianceSection")),
  // lazyLoadSection(() => import("/components/Home/TribeFightersSection")),
  // lazyLoadSection(() => import("/components/Home/StatsSection")),
  // lazyLoadSection(() => import("/components/Home/LastNewsSection")),
];

const HomePage: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl p-0">
      <Suspense fallback={<div>Error Loading section...</div>}>
        <div className="p-4">
          <h1 className="text-2xl font-bold">Witamy w Tribe Odyssey!</h1>
          <p>To jest strona główna.</p>
        </div>
      </Suspense>
    </div>
  );
};

export default HomePage;
