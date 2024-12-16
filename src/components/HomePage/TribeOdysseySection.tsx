import useLazyLoading from '@hooks/useLazyLoading';
import React from 'react';
import Card from '../common/card/Card';

const TribeOdysseySection: React.FC = () => {
  useLazyLoading();
  const sideImages = [
    'images/tribunus.png',
    'images/shaman1.jpeg',
    'images/molten-throne.png',
  ];

  return (
    <div className="">
      {/* Main Image */}
      <div className="flex flex-row justify-center  ">
        <Card
          width="60vw"
          height="60vw"
          image={{
            'data-src': 'images/molten-throne.png',
            alt: 'Tribe Odyssey',
          }}
          className=""
        />
        {/* Side Images Container */}
        <div className=" top-0 left-0 flex flex-col  space-y-4 justify-between h-full">
          {sideImages.map((image, index) => (
            <div key={index} className="mb-2.5">
              <Card
                width="20vw"
                height="20vw"
                image={{ 'data-src': image, alt: `Side NFT ${index + 1}` }}
                className="w-[142px] h-[142px]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TribeOdysseySection;
