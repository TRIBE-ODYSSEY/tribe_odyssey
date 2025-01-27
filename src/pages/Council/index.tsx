import React, { useEffect } from 'react';
import PageLayout from '@src/components/common/layout/PageLayout';
import HeroSection from './components/HeroSection';
import FeatureGrid from './components/FeatureGrid';
import LandscapeHero from './components/LandscapeHero';
import { features } from './data/features.data';

const CouncilPage: React.FC = () => {
  useEffect(() => {
    document.title = "Council | Tribe Odyssey";
  }, []);

  const heroProps = {
    logoSrc: "/images/council_logo.jpg",
    tribunusImageSrc: "/images/tribunus.png", 
    aragonLogoSrc: "/images/aragon_Logo.svg",
    title: "Shaping Our Future",
    descriptions: [
      "In the grand arena of governance, where decisions echo through the halls of time, the Council shapes the destiny of our tribe.",
      "The council is overseen by the Tribunus Plebis who has the role of protecting the rights and interests of the Tribe.",
      "Ask to be admitted to the council in our Discord server."
    ],
    ctaLink: "https://app.aragon.org/#/daos/base/0xb88e7e7c71bdf1124d1b73093f2946dc153644d1/dashboard",
    ctaText: "The Council"
  };

  return (
    <PageLayout>
      <div className="relative z-10 space-y-24 pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-[1200px] mx-auto rounded-2xl overflow-hidden">
            <div className="relative">
              {/* Background gradient overlay */}
              {/* <div className="absolute inset-0 bg-gradient-to-b 
                           from-[var(--color-overlay-dark)]/20 
                           to-[var(--color-overlay-dark)]/5 
                           pointer-events-none" /> */}
              
              {/* Content */}
              <div className="relative z-10">
                <HeroSection {...heroProps} />
                <FeatureGrid features={features} />
              </div>
            </div>
          </div>
        </div>

        <LandscapeHero
          imageSrc="/images/MWCouncil.jpg"
          title="Shaping Our Future"
          subtitle="Council Vision"
          description="Through democratic governance and collective wisdom, we forge the path ahead for our tribe. Every voice matters, every vote counts."
          overlayType="pattern"
          parallaxSpeed={0.3}
        />
      </div>
    </PageLayout>
  );
};

export default CouncilPage;