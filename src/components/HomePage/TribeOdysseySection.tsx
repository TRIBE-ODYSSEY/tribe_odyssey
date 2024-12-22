import useLazyLoading from '@hooks/useLazyLoading';
import React from 'react';
import Card from '../common/card/Card';

const TribeOdysseySection: React.FC = () => {
  useLazyLoading();
  const sideImages = [
    'images/tribunus.png',
    'images/shaman1.jpeg',
    'images/monkey.jpg',
  ];

  return (
    <div className=" w-full h-auto">
      {/* Main Image */}
      <div className="flex flex-row justify-center items-center">
        <Card
          image={{
            'data-src': 'images/monkey.jpg',
            alt: 'Tribe Odyssey',
          }}
          className=" h-auto"
        />
        {/* Side Images Container */}
        <div className="  top-5 left-5 flex flex-col space-y-14 justify-between h-full">
          {sideImages.map((image, index) => (
            <div key={index} className="mb-2.5">
              <Card
                image={{ 'data-src': image, alt: `Side NFT ${index + 1}` }}
                className="w-16 h-auto"
                width="40%"
                isSquare="200px"
                height="20%"
              />
            </div>
          ))}
        </div>
        <div className="g-center flex-1 flex flex-col justify-center p-4 max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Tribe Odyssey</h2>
          <p className="text-center">
            A collection of 9400 badass and entirely original ape NFT characters
            that live on the Ethereum Blockchain.
          </p>
          <span>
            The collection's lore is based in an alternate dimension. Within
            this dimension exists a futuristic world, a harsh and barren ruled
            by a tech advanced ape civilisation.
          </span>
        </div>
      </div>
    </div>
  );
};

export default TribeOdysseySection;
