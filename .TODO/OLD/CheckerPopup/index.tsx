import React, { useState, useEffect } from "react";
import {
  Close as CloseIcon,
  ArrowDownward as ArrowDownwardIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import Confetti from "react-confetti";

interface CheckerPopupProps {
  open: boolean;
  onClose: () => void;
  data: {
    assetsValue: string;
    favoriteSpecies: string;
    totalAssets: number;
    progress: number;
    missingSpecies?: string[];
    nanaPoints: number;
  } & {
    isEligible: boolean;
    message: string;
  };
}

export const CheckerPopup: React.FC<CheckerPopupProps> = ({
  open,
  onClose,
  data,
}) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    assetsValue,
    favoriteSpecies,
    totalAssets,
    progress,
    missingSpecies,
    isEligible,
    message,
    nanaPoints,
  } = data;

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className={`bg-backgroundPaper rounded-lg shadow-lg z-60 max-w-lg w-11/12 sm:w-4/5 md:w-[600px] p-6 relative animate-fadeInUp`}
      >
        {isEligible && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={200}
            recycle={false}
            colors={["#FF0008", "#EBEBEB", "#FFD700", "#FF69B4"]}
          />
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 rounded-full border border-danger flex items-center justify-center hover:bg-dangerHover"
        >
          <CloseIcon className="text-danger" style={{ fontSize: 20 }} />
        </button>

        <div className="pt-4 pb-6">
          {/* Status Alert */}
          <div
            className={`mb-6 p-3 rounded ${
              isEligible
                ? "bg-success/20 border border-success text-ethAddress"
                : "bg-blue-800 border border-blue-600 text-ethAddress"
            }`}
          >
            {message}
          </div>

          {/* Title Section */}
          <h1
            className={`text-center font-medium mb-2 text-transparent bg-clip-text font-sans ${
              isEligible
                ? "bg-gradient-to-b from-yellow-400 to-orange-500 text-2xl sm:text-3xl"
                : "bg-gradientText text-2xl sm:text-3xl"
            }`}
            style={{
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {isEligible ? "Congratulations!" : "Road to T19"}
          </h1>

          {/* Progress Section */}
          <div className="text-center mb-6">
            <p className="font-semibold text-ethAddress text-lg">
              {progress}/19
            </p>
            <div className="relative h-2 my-2 bg-backgroundDark rounded">
              <div
                className={`h-2 rounded ${
                  isEligible
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                    : "bg-danger"
                }`}
                style={{ width: `${(progress / 19) * 100}%` }}
              >
                <span
                  className={`absolute top-1/2 right-0 transform -translate-y-1/2 ${
                    isEligible ? "bg-yellow-400" : "bg-danger"
                  } rounded-full w-2 h-2`}
                ></span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <p className="text-xs text-ethAddress mb-1">Assets value</p>
              <p className="text-base font-semibold text-ethAddress">
                {assetsValue}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-ethAddress mb-1">
                Favourite species
              </p>
              <p className="text-base font-semibold text-ethAddress">
                {favoriteSpecies}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-ethAddress mb-1">Total assets</p>
              <p className="text-base font-semibold text-ethAddress">
                {totalAssets}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-ethAddress mb-1">NANA points/day</p>
              <p className="text-base font-semibold text-ethAddress">
                {nanaPoints || totalAssets * 10}
              </p>
            </div>
          </div>

          {/* Next Species Section */}
          {!isEligible && missingSpecies && missingSpecies.length > 0 && (
            <>
              <h2 className="text-center font-semibold text-lg text-ethAddress mb-2">
                COLLECT THESE SPECIES
              </h2>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {missingSpecies.slice(0, 2).map((species, index) => (
                  <div
                    key={species}
                    className="flex items-center gap-2 bg-backgroundDark p-2 px-4 rounded-full"
                  >
                    {index === 0 ? (
                      <ArrowDownwardIcon className="text-ethAddress" />
                    ) : (
                      <ImageIcon className="text-ethAddress" />
                    )}
                    <p className="text-sm text-ethAddress">{species}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* All Missing Species */}
          {!isEligible && missingSpecies && missingSpecies.length > 2 && (
            <div className="mt-4 text-center">
              <p className="text-xs text-ethAddress mb-1">
                Other Missing Species
              </p>
              <p className="text-sm text-ethAddress">
                {missingSpecies.slice(2).join(", ")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckerPopup;
