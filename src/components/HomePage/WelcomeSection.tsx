import { IMAGES } from '@assets/index';
import { ImageCategories } from '@assets/types';
import React from 'react';
import LazyImage from '../common/LazyImage';

const WelcomeSection: React.FC = () => {
  const moltenThrone = IMAGES[ImageCategories.MOLTEN_THRONE];
  return (
    <div className="flex flex-col md:flex-row min-h-screen p-4">
      {/* Left Content */}
      <div className="flex-1 flex flex-col justify-center p-4">
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Welcome to
            <br />
            Tribe Odyssey
          </h2>
        </div>
        <p className="mb-4">
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

      {/* Right Content */}
      <div className="flex-1 p-4">
        <LazyImage
          src={moltenThrone}
          alt="Molten Throne"
          classNameCSS="w-full h-auto min-h-[300px]"
        />
      </div>
    </div>
  );
};

export default WelcomeSection;
