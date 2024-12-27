import Card from '@src/components/common/card/Card';
import React from 'react';

const WelcomeSection: React.FC = () => {
  return (
    <section className="flex flex-col xl:flex-row gap-6 content-1 h- p-4 items-center justify-center">
      {/* Left Content */}
      <section className="flex-1 flex flex-col justify-center p-4 max-w-lg">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Welcome to
          <br />
          Tribe Odyssey
        </h2>

        <p className="mb-4 text-center">
          Welcome to the Tribe project. Home of the highly popular 0xApes and
          Tribe Odyssey NFT collection
        </p>
        <p className="text-center">
          The 0xApes and Tribe phenom has taken the digital collectibles space
          by storm inspiring a movement driven by the power of community, a
          community that has over 30,000 members and growing across all its
          social media platforms.
        </p>
      </section>

      {/* Right Content */}

      <section className="relative content-1 overflow-hidden">
        <Card
          image={{ 'data-src': '/images/molten-throne.png' }}
          className="object-cover w-full h-auto transition-transform duration-300 ease-out hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-white/20"></div>
      </section>
    </section>
  );
};

export default WelcomeSection;
