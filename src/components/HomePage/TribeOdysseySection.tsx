import useLazyLoading from '@hooks/useLazyLoading';
import React from 'react';
import Card from '../common/card/Card';

const sideImages = [
  'images/tribunus.png',
  'images/shaman1.jpeg',
  'images/monkey.jpg',
];

const SideImages: React.FC = () => (
  <div
    className="
    flex 
    flex-row 
    items-center 
    justify-center 
    space-x-2

    xl:flex-col 
    xl:items-start 
    xl:justify-start 
    xl:space-x-0 
    xl:space-y-2
  "
  >
    {sideImages.map((image, index) => (
      <Card
        key={index}
        image={{ 'data-src': image, alt: `Side NFT ${index + 1}` }}
        className="w-16 h-auto"
        width="40%"
        isSquare="200px"
        height="20%"
      />
    ))}
  </div>
);

const MainCard: React.FC = () => (
  <Card
    image={{
      'data-src': 'images/monkey.jpg',
      alt: 'Tribe Odyssey',
    }}
    className="h-auto"
    isSquare="600px"
  />
);

const Description: React.FC = () => (
  <section
    className="flex-1
               flex
               flex-col
               justify-center
               p-4 
               max-w-lg"
  >
    <h1
      className="text-4xl
                 font-bold 
                 mb-4"
    >
      Tribe Odyssey
    </h1>
    <p className="text-center text-2xl">
      A collection of 9400 badass and entirely original ape NFT characters that
      live on the Ethereum Blockchain.
    </p>
    <span className="text-center text-lg">
      The collection's lore is based in an alternate dimension. Within this
      dimension exists a futuristic world, a harsh and barren ruled by a tech
      advanced ape civilisation.
    </span>
  </section>
);

const TribeOdysseySection: React.FC = () => {
  {
    /*
  - Na małych ekranach (flex-col):
    MainCard będzie wyżej, a SideImages poniżej (dzięki flex-col-reverse odwrócimy kolejność).
  - Na dużych ekranach (xl:flex-row):
    SideImages przechodzą do kolumny z lewej, a MainCard z prawej; Description jest jeszcze dalej w prawo.
*/
  }
  useLazyLoading();

  return (
    <section
      className="
      flex 
      flex-col
      xl:flex-row
      items-center 
      justify-center 
      h-auto
    "
    >
      <div
        className="
        flex
        flex-col-reverse
        items-center
        xl:flex-row
        xl:gap-4
        xl:space-y-4
        xl:items-center
        xl:justify-center
      "
      >
        <MainCard />
        <SideImages />
      </div>

      <Description />
    </section>
  );
};

export default TribeOdysseySection;
