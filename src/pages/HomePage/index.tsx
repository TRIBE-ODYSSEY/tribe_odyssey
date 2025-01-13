
import { Spinner } from 'flowbite-react';
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
  lazyLoadSection(() => import('@src/components/HomePage/TribeOdysseySection')),
  lazyLoadSection(
    () => import('@src/components/HomePage/WhispersOfLoresSection')
  ),
  lazyLoadSection(() => import('@src/components/HomePage/GoldApesSection')),
  lazyLoadSection(() => import('@src/components/HomePage/StatsSection')),
  lazyLoadSection(() => import('@src/components/HomePage/AccomplishmentsSection')),
  lazyLoadSection(() => import('@src/components/HomePage/LastNewsSection')),
  lazyLoadSection(() => import('@src/components/HomePage/LogoSection')),
  lazyLoadSection(() => import('@src/components/HomePage/FaqSection')),
];

const HomePage: React.FC = () => {
  return (
    <section className="max-w-full">
      <Suspense
        fallback={
          <Spinner color="warning" aria-label="Warning spinner example" />
        }
      >
        {sections.map((Section, index) => (
          <div key={index} className="mb-8 ">
            <Section />
          </div>
        ))}
      </Suspense>
    </section>
  );
};

export default HomePage;
