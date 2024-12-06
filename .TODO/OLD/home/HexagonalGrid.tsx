import React from "react";
import { IMAGES } from "@config/contracts/constants/images";

const HexagonalGrid: React.FC = () => {
  return (
    <div
      className="
        absolute
        w-full
        h-full
        opacity-10
        pointer-events-none
        z-0
        bg-no-repeat
        bg-center
        bg-[url('${IMAGES.icons.hexGrid}')]
        bg-[size:50px_50px]
        transition-opacity duration-700 ease-in-out
        opacity-0
        animate-fade-in
      "
    />
  );
};

export default HexagonalGrid;
