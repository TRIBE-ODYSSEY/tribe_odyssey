import React from "react";

interface CardBidMainProps {
  image: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  variant?: "default" | "golden";
}

export const CardBidMain: React.FC<CardBidMainProps> = ({
  image,
  alt = "Tribe NFT",
  width = "100%",
  height = "100%",
  variant = "default",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 p-4 relative rounded-lg border-2 transition-transform duration-300 cursor-pointer ${
        variant === "golden"
          ? "bg-gradient-to-tr from-yellow-400 via-yellow-300 to-yellow-200 border-transparent shadow-lg hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-yellow-400 hover:to-yellow-300"
          : "bg-gradient-to-b from-transparent to-white/15 border-white border-opacity-10 hover:-translate-y-1 hover:border-opacity-20"
      }`}
      style={{ width, height }}
    >
      <div className="relative w-full h-full overflow-hidden rounded-md transition-transform duration-300">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
        />
      </div>
    </div>
  );
};

export default CardBidMain;
