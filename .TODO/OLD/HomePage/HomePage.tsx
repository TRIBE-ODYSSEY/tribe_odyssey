import React, { Suspense, lazy } from "react";
import HexagonalGrid from "../Common/home/HexagonalGrid";

type SectionComponent = React.LazyExoticComponent<React.ComponentType<any>>;

const lazyLoadSection = (
  importFn: () => Promise<{ default: React.ComponentType<any> }>
) =>
  lazy(async () => {
    try {
      return await importFn();
    } catch (error) {
      console.error("Error loading section:", error);
      throw error;
    }
  });

const sections: SectionComponent[] = [
  lazyLoadSection(() => import("./WelcomeSection")),
  lazyLoadSection(() => import("./TribeOdysseySection")),
  lazyLoadSection(() => import("./WhispersOfLoresSection")),
  lazyLoadSection(() => import("./GoldApesSection")),
  lazyLoadSection(() => import("./TribeAllianceSection")),
  lazyLoadSection(() => import("./TribeFightersSection")),
  lazyLoadSection(() => import("./StatsSection")),
  lazyLoadSection(() => import("./LastNewsSection")),
];

const HomePage: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl p-0">
      <HexagonalGrid />
      <Suspense fallback={<div>Error Loading section...</div>}>
        {sections.map((Section, index) => (
          <Section key={index} />
        ))}
      </Suspense>
    </div>
  );
};

export default HomePage;
