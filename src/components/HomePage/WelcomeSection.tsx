import Card from '@src/components/common/card/Card';
import React from 'react';

const WelcomeSection: React.FC = () => {
  return (
    <section className="container mx-auto flex flex-col xl:flex-row items-center justify-center gap-8 px-4 py-12 sm:py-16">
      {/* Content */}
      <div className="flex-1 max-w-xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-white/90">
          Welcome to
          <br />
          Tribe Odyssey
        </h2>

        <div className="space-y-4 text-center text-white/80">
          <p>
            Welcome to the Tribe project. Home of the highly popular 0xApes and
            Tribe Odyssey NFT collection
          </p>
          <p>
            The 0xApes and Tribe phenom has taken the digital collectibles space
            by storm inspiring a movement driven by the power of community, a
            community that has over 30,000 members and growing across all its
            social media platforms.
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="relative max-w-lg w-full">
        <Card
          image={{ 
            'data-src': '/images/molten-throne.png',
            alt: 'Molten Throne'
          }}
          className="w-full rounded-2xl overflow-hidden shadow-xl"
        />
        <div className="absolute inset-0 rounded-2xl">
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
