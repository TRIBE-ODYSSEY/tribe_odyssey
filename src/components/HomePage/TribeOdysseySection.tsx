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
    <section className="  flex flex-col-reverse xl:flex-row items-center justify-center h-auto">
      {/* Main Image */}
      <section className="flex flex-row space-x-3 justify-center items-center ">
        <Card
          image={{
            'data-src': 'images/monkey.jpg',
            alt: 'Tribe Odyssey',
          }}
          className=" h-auto"
          isSquare="600px"
        />
        {/* Side Images Container */}
        <div className="  top-5 left-5 flex flex-col space-y-1 justify-between h-full">
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
      </section>
      <section className="g-center flex-1 flex flex-col justify-center p-4 max-w-lg">
        <h1 className="text-4xl font-bold mb-4">Tribe Odyssey</h1>
        <p className="text-center text-2xl">
          A collection of 9400 badass and entirely original ape NFT characters
          that live on the Ethereum Blockchain.
        </p>
        <span>
          The collection's lore is based in an alternate dimension. Within this
          dimension exists a futuristic world, a harsh and barren ruled by a
          tech advanced ape civilisation.
        </span>
      </section>
    </section>
  );
};

export default TribeOdysseySection;
