import React from "react";
import { IMAGES } from "@config/contracts/constants/images";
import HexagonalGrid from "@components/Common/home/HexagonalGrid";

const WhispersOfLoresSection:React.FC = () => {
  const lores = [
    {
      id: 1,
      title: "The Great Exodus",
      content: "In the wake of Earth's devastation...",
      image: IMAGES.lore.exodus,
    },
    {
      id: 2,
      title: "Rise of the Golden Dynasty",
      content: "From the ashes of the old world emerged the 24 Carat Apes...",
      image: IMAGES.lore.golden,
    },
    {
      id: 3,
      title: "The Digital Revolution",
      content: "As our civilization evolved...",
      image: IMAGES.lore.digital,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-6 md:py-12 relative">
      <HexagonalGrid />
      <div>
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-6xl font-medium bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent mb-3">
            Whispers of Lores
          </h2>
          <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto">
            Discover the rich tapestry of stories that shape our digital realm
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lores.map((lore, index) => (
            <div
              key={lore.id}
              className="bg-white bg-opacity-3 backdrop-blur-lg border border-white border-opacity-10 rounded-lg overflow-hidden transition transform hover:-translate-y-2 hover:border-opacity-20"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={lore.image}
                  alt={lore.title}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-white/20 via-white/20"></div>
              </div>
              <div className="p-3">
                <h5 className="text-xl font-semibold mb-2 bg-gradient-to-r from-red-600 to-pink-400 bg-clip-text text-transparent">
                  {lore.title}
                </h5>
                <p className="text-sm text-white/80 leading-6">{lore.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhispersOfLoresSection;
