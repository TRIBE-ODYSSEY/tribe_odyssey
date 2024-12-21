import Card from '@src/components/common/card/Card';
import React from 'react';

const WelcomeSection: React.FC = () => {
  return (
    <div className="flex flex-row  content-1 md:flex-row h- p-4 items-center justify-center">
      {/* Left Content */}
      <div className="flex-1 flex flex-col justify-center p-4 max-w-lg">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-center">
            Welcome to
            <br />
            Tribe Odyssey
          </h2>
        </div>
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
      </div>

      {/* Right Content */}

      <div className="relative content-1 overflow-hidden">
        <Card
          image={{ 'data-src': '/images/molten-throne.png' }}
          className="w-96 h-56 -full object-cover transition-transform duration-300 ease-out hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-white/20"></div>
      </div>
    </div>
  );
};

export default WelcomeSection;
