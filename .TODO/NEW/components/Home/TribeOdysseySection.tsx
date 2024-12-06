import React from "react";
import { IMAGES } from "@config/contracts/constants/images";
import HexagonalGrid from "@libs/components/Common/home/HexagonalGrid";
import CardBidMain from "@libs/components/Common/home/CardBidMain";

const TribeOdysseySection:React.FC = () => {
  const sideImages = [
    IMAGES.odyssey.nft1,
    IMAGES.odyssey.nft2,
    IMAGES.odyssey.nft3,
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 md:py-32 relative">
      <HexagonalGrid />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-7">
          <div className="relative flex gap-2 items-center">
            {/* Main Image */}
            <div className="flex-1 transition-opacity duration-600 ease-out opacity-100 transform translate-y-0">
              <CardBidMain
                image={IMAGES.odyssey.nft1}
                alt="Tribe NFT"
                width="100%"
                height="500px"
              />
            </div>

            {/* Side Images Container */}
            <div className="flex flex-col gap-2 w-[142px]">
              {sideImages.map((image, index) => (
                <div
                  key={index}
                  className={`transition-all duration-600 ease-out opacity-100 transform translate-x-0 delay-${index * 200}`}
                >
                  <CardBidMain
                    image={image}
                    alt={`Side NFT ${index + 1}`}
                    width="142px"
                    height="142px"
                    variant="golden"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-5">
          <div className="flex flex-col gap-16 h-full justify-center">
            <div className="transition-all duration-600 ease-out opacity-100 transform translate-x-0">
              <h2 className="text-4xl md:text-6xl font-medium bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent mb-12">
                Tribe Odyssey
              </h2>

              <p className="text-lg md:text-2xl text-white/90 mb-12">
                A collection of 9400 badass and entirely original ape NFT
                characters that live on the Ethereum Blockchain.
              </p>

              <p className="text-base text-white/70 leading-6 mb-16">
                The collection's lore is based in an alternate dimension. Within
                this dimension exists a futuristic world, a harsh and barren
                wasteland ruled by a tech advanced ape civilisation.
              </p>

              <button
                className="rounded-full border border-white/10 bg-radial-gradient text-white px-6 py-3 text-base no-underline hover:border-white/20 hover:bg-radial-gradient-hover transition-colors"
              >
                View on Opensea
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TribeOdysseySection;
