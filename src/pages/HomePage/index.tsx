import React, { lazy, Suspense } from 'react';
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
  lazyLoadSection(() => import('@src/components/HomePage/ChapterSection')),
  lazyLoadSection(() => import('@src/components/HomePage/WelcomeSection')),
  lazyLoadSection(() => import('@src/components/HomePage/TribeOdysseySection')),
  lazyLoadSection(
    () => import('@src/components/HomePage/WhispersOfLoresSection')
  ),
  lazyLoadSection(() => import('@src/components/HomePage/GoldApesSection')),
  lazyLoadSection(
    () => import('@src/components/HomePage/TribeAllianceSection')
  ),
  lazyLoadSection(
    () => import('@src/components/HomePage/TribeFightersSection')
  ),
  lazyLoadSection(() => import('@src/components/HomePage/StatsSection')),
  lazyLoadSection(() => import('@src/components/HomePage/LastNewsSection')),
];

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center">
      <Suspense fallback={<div>Loading sections...</div>}>
        {sections.map((Section, index) => (
          <div key={index} className="mb-8">
            <Section />
          </div>
        ))}
      </Suspense>
    </div>
  );
};

export default HomePage;
