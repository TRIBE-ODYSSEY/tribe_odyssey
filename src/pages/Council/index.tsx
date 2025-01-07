import React, { useEffect } from 'react';
import PageLayout from '@src/components/common/layout/PageLayout';
import { 
  ScaleIcon, 
  ShieldCheckIcon, 
  FireIcon, 
  UsersIcon 
} from '@heroicons/react/24/outline';

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

const HeroSection = () => (
  <div className="container mx-auto px-4 py-16">
    <div className="max-w-[1200px] mx-auto">
      <div className="flex flex-col lg:flex-row items-start gap-8 mb-16">
        <img 
          src="/images/council_logo.jpg"
          alt="Council Logo"
          className="w-24 h-24 rounded-full object-cover flex-shrink-0"
        />

        <div className="flex flex-col items-center lg:items-start flex-1 
                      max-w-[535px]">
          <h1 className="font-montserrat text-4xl md:text-5xl text-white/90 
                       text-center lg:text-left mb-6">
            Tribe Council
          </h1>

          <div className="space-y-4 text-center lg:text-left mb-8">
            <p className="font-montserrat text-lg md:text-xl text-white/70">
              Through blood and stone, through fire and breath, Tribunus Plebis 
              The Gladiator leads with iron and grit.
            </p>
            <p className="font-montserrat text-lg md:text-xl text-white/70">
              In the grand arena of governance, where decisions echo through 
              the halls of time, the Council shapes the destiny of our tribe.
            </p>
            <p className="font-montserrat text-base text-white/70">
              The Voice of the Tribe.
            </p>
          </div>

          <a 
            href="https://app.aragon.org/#/daos/base/0xb88e7e7c71bdf1124d1b73093f2946dc153644d1/dashboard" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block px-8 py-3 bg-white hover:bg-white/90 text-red-600 rounded-full font-inter text-lg transition-300"
          >
            Join the Council
          </a>

          <div className="flex flex-col items-center lg:items-start gap-2 mt-8">
            <span className="text-white/50 text-sm">Powered by</span>
            <img 
              src="/images/aragon_Logo.svg"
              alt="Aragon DAO"
              className="w-[143px] h-8 opacity-80 hover:opacity-100 transition-300"
            />
          </div>
        </div>

        <img 
          src="/images/tribunus.png"
          alt="Tribunus Plebis"
          className="hidden lg:block w-[467px] h-[592px] rounded-2xl 
                   shadow-lg shadow-black/25 object-cover"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <div key={i} className="group">
            <div className="bg-[#181818] border border-white/10 rounded-lg p-6 
                        transition-300 group-hover:-translate-y-1 
                        group-hover:border-white/20">
              <feature.icon className="w-8 h-8 text-red-600 mb-4" />
              <h3 className="text-white font-montserrat font-semibold 
                          text-lg mb-3">
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
);

const CouncilPage: React.FC = () => {
  useEffect(() => {
    document.title = "Council | Tribe Odyssey";
  }, []);

  return (
    <PageLayout>
      <HeroSection />
    </PageLayout>
  );
};

export default CouncilPage; 