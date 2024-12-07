import { IMAGES, } from '@assets/index';
import React from 'react';

const WelcomeSection: React.FC = () => {
  return (
    <div>
      <div>
        {/* Left Content */}
        <div>
          <div>
            <h2>
              Welcome to
              <br />
              Tribe Odyssey
            </h2>
          </div>

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

        {/* Right Content */}
        <div>
          <img
            src={IMAGES.moltenThrone}
            alt="Molten Throne"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              const target = e.currentTarget;
              target.onerror = null;
              target.src = IMAGES.placeholder;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
