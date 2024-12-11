import { IMAGES } from '@assets/index';
import { ImageCategories } from '@assets/types';
import React from 'react';

const TribeOdysseySection: React.FC = () => {
  const sideImages = [
    IMAGES[ImageCategories.ODYSSEY].nft1,
    IMAGES[ImageCategories.ODYSSEY].nft2,
    IMAGES[ImageCategories.ODYSSEY].nft3,
  ];

  return (
    <div>
      <div>
        <div></div>
        <div>
          {/* Main Image */}
          <div>
            <img
              src={IMAGES[ImageCategories.ODYSSEY].nft1}
              alt="Tribe NFT"
              style={{ width: '100%', height: '500px' }}
            />
          </div>

          {/* Side Images Container */}
          <div>
            {sideImages.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Side NFT ${index + 1}`}
                  style={{ width: '142px', height: '142px' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div>
          <div>
            <h2>Tribe Odyssey</h2>

            <p>
              A collection of 9400 badass and entirely original ape NFT
              characters that live on the Ethereum Blockchain.
            </p>

            <p>
              The collection's lore is based in an alternate dimension. Within
              this dimension exists a futuristic world, a harsh and barren
              wasteland ruled by a tech advanced ape civilisation.
            </p>

            <button>View on Opensea</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TribeOdysseySection;
