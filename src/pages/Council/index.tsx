import React, { useEffect } from 'react';
import PageLayout from '@src/components/common/layout/PageLayout';
import { ScaleIcon, ShieldCheckIcon, FireIcon, UsersIcon } from '@heroicons/react/24/outline';

const tribunusImage = '/images/tribunus.png';

const HeroSection = () => (
  <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8 mb-8">
    {/* Left Content */}
    <div className="flex flex-col items-center max-w-[535px] py-6">
      <h1 className="font-montserrat text-4xl md:text-5xl text-white/90 text-center mb-6">
        Tribe Council
      </h1>

      <div className="space-y-4 text-center mb-8">
        <p className="font-montserrat text-lg md:text-xl text-white/70">
          Through blood and stone, through fire and breath, Tribunus Plebis The Gladiator
          leads with iron and grit.
        </p>
        <p className="font-montserrat text-lg md:text-xl text-white/70">
          In the grand arena of governance, where decisions echo through the halls
          of time, the Council shapes the destiny of our tribe through wisdom
          earned in combat and compassion tempered by strength.
        </p>
        <p className="font-montserrat text-base text-white/70">
          The Voice of the Tribe.
        </p>
      </div>

      <button className="px-8 py-3 bg-white hover:bg-white/90 text-dark rounded-full 
                       font-inter text-lg transition-all duration-300">
        Join the Council
      </button>
    </div>

    {/* Right Image */}
    <div className="hidden md:block w-[467px] h-[592px] relative">
      <img
        src={tribunusImage}
        alt="Tribunus Plebis"
        className="absolute inset-0 w-full h-full object-cover rounded-2xl 
                   shadow-lg shadow-black/25"
      />
    </div>
  </div>
);

const CouncilPage: React.FC = () => {
  useEffect(() => {
    document.title = "Council | Tribe Odyssey";
  }, []);

  const features = [
    {
      title: "Justice & Order",
      desc: "The Council maintains order through ancient laws and traditions.",
      icon: ScaleIcon
    },
    {
      title: "Protection",
      desc: "Under the watchful eye of Tribunus Plebis, the tribe's interests are protected.",
      icon: ShieldCheckIcon
    },
    {
      title: "Sacred Flame",
      desc: "The eternal flame of leadership burns bright, guiding our tribe.",
      icon: FireIcon
    },
    {
      title: "Tribal Unity",
      desc: "Fostering unity and strength through collective wisdom.",
      icon: UsersIcon
    }
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-[1200px] mx-auto">
          <HeroSection />

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <div key={i} className="group">
                <div className="bg-[#181818] border border-white/10 rounded-lg p-6
                              transition-all duration-300 group-hover:-translate-y-1 
                              group-hover:border-white/20">
                  <feature.icon className="w-8 h-8 text-red-600 mb-4" />
                  <h3 className="text-white font-montserrat font-semibold text-lg mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 font-montserrat text-sm">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CouncilPage; 