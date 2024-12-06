import React from "react";
import { LocalMall as LocalMallIcon } from "@mui/icons-material";

interface DonationProgressProps {
  totalDonations: number;
  goalAmount: number;
  hoodiesProvided: number;
}

export const DonationProgress: React.FC<DonationProgressProps> = ({
  totalDonations,
  goalAmount,
  hoodiesProvided,
}) => {
  const progress = Math.min((totalDonations / goalAmount) * 100, 100); // Zapewnia, że progress nie przekroczy 100%
  const hoodiesRemaining = Math.floor((goalAmount - totalDonations) / 44);
  const pricePerHoodie = ((goalAmount - totalDonations) / 44).toFixed(2);

  return (
    <div className="w-full p-6 bg-[rgba(255, 255, 255, 0.03)] rounded-lg border border-[rgba(255,255,255,0.1)] mb-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <LocalMallIcon className="text-[#ff0008] w-7 h-7" />
        <h2 className="text-white text-lg md:text-xl font-semibold">Donation Progress</h2>
      </div>

      {/* Progress Information */}
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span className="text-gray-400">${totalDonations.toLocaleString()} raised</span>
          <span className="text-gray-400">Goal: ${goalAmount.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#ff0008] h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Statistics */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        {/* Hoodies Provided */}
        <div>
          <p className="text-[#ff0008] text-2xl md:text-3xl font-bold">{hoodiesProvided}</p>
          <p className="text-gray-400 text-sm md:text-base">Hoodies Provided</p>
        </div>

        {/* Hoodies Remaining */}
        {hoodiesRemaining >= 0 && (
          <div>
            <p className="text-[#ff0008] text-2xl md:text-3xl font-bold">{hoodiesRemaining}</p>
            <p className="text-gray-400 text-sm md:text-base">Hoodies Remaining</p>
          </div>
        )}

        {/* Price Per Hoodie */}
        <div>
          <p className="text-[#ff0008] text-2xl md:text-3xl font-bold">${pricePerHoodie}</p>
          <p className="text-gray-400 text-sm md:text-base">Per Hoodie</p>
        </div>
      </div>
    </div>
  );
};

export default DonationProgress;