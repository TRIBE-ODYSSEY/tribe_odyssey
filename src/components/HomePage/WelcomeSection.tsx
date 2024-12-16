import React from 'react';

const WelcomeSection: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row h- p-4 items-center justify-center">
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
      <div className="flex-1 p-4 max-w-lg">
        <img data-src="images/molten-throne.png" alt="Molten Throne" className="mx-auto" />
      </div>
    </div>
  );
};

export default WelcomeSection;
