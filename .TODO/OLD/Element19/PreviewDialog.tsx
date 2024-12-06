import React from "react";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
// import StarIcon from "@heroicons/react/solid/StarIcon";
// import CalendarTodayIcon from "@heroicons/react/solid/CalendarIcon";
// import CloseIcon from "@heroicons/react/solid/XIcon";
import { CollectionItem } from "../../../types";

interface PreviewDialogProps {
  item: CollectionItem;
  open: boolean;
  onClose: () => void;
  onCollect: () => void;
  collecting: boolean;
}

export const PreviewDialog: React.FC<PreviewDialogProps> = ({
  item,
  open,
  onClose,
  onCollect,
  collecting,
}) => {
  const { isConnected } = useAccount();

  const handleCollect = async () => {
    try {
      await onCollect();
      toast.success("Successfully collected item!");
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to collect item"
      );
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-[#14121b] border border-[rgba(255,255,255,0.1)] rounded-2xl w-full max-w-5xl m-2 overflow-hidden flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 z-10"
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        {/* Left Side - Image */}
        <div className="md:w-7/12 w-full relative min-h-[300px] md:min-h-[600px]">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain bg-[rgba(0,0,0,0.2)] transition-opacity duration-300 opacity-0 animate-fadeInScale"
          />
        </div>

        {/* Right Side - Details */}
        <div className="md:w-5/12 w-full p-6 flex flex-col bg-[rgba(0,0,0,0.3)]">
          {/* Title and Status */}
          <div className="mb-4">
            <h3 className="text-white font-montserrat font-semibold mb-2 text-2xl md:text-4xl">
              {item.title}
            </h3>
            <span
              className={`inline-block px-3 py-1 text-white font-medium rounded ${
                item.status === "Available"
                  ? "bg-green-500"
                  : item.status === "Coming Soon"
                  ? "bg-blue-500"
                  : "bg-gray-500"
              }`}
            >
              {item.status}
            </span>
          </div>

          {/* Description */}
          <p className="text-white opacity-90 mb-4 text-base leading-6">
            {item.description}
          </p>

          {/* Price */}
          {item.price && (
            <div className="mb-3">
              <p className="text-white opacity-60 mb-1 text-sm">Price</p>
              <div className="flex items-center gap-1">
                <StarIcon className="h-5 w-5 text-red-600" />
                <span className="text-white font-semibold text-xl">
                  {item.price} ETH
                </span>
              </div>
            </div>
          )}

          {/* Release Date */}
          {item.releaseDate && (
            <div className="mb-4">
              <p className="text-white opacity-60 mb-1 text-sm">Release Date</p>
              <div className="flex items-center gap-1">
                <CalendarTodayIcon className="h-5 w-5 text-red-600" />
                <span className="text-white">{item.releaseDate}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-auto flex gap-2">
            <button
              disabled={
                item.status !== "Available" || collecting || !isConnected
              }
              onClick={handleCollect}
              className={`w-full py-2 rounded-full ${
                collecting || !isConnected || item.status !== "Available"
                  ? "bg-red-600 bg-opacity-10 text-white cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {collecting
                ? "Collecting..."
                : !isConnected
                ? "Connect Wallet"
                : item.status === "Available"
                ? "Collect Now"
                : item.status === "Coming Soon"
                ? "Coming Soon"
                : "Sold Out"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};