import React from "react";
import { CollectionItem as ICollectionItem } from "../../../types";

interface CollectionItemProps extends ICollectionItem {
  onCollect: () => void;
  collecting?: boolean;
  onPreview: () => void;
}

export const CollectionItem: React.FC<CollectionItemProps> = ({
  image,
  title,
  description,
  price,
  releaseDate,
  status,
  onPreview,
}) => {
  const statusColors = {
    Available: "bg-green-500",
    "Coming Soon": "bg-blue-500",
    default: "bg-gray-500",
    "Sold Out": "bg-red-500",
  };

  return (
    <div
      onClick={onPreview}
      className="bg-[#181818] border border-white border-opacity-10 rounded-lg transition-transform duration-300 cursor-pointer h-full flex flex-col hover:-translate-y-1 hover:border-opacity-20"
    >
      <div className="relative w-full pt-[100%]">
        <img
          src={image}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-4">
        <div className="flex justify-between items-start mb-2">
          <h6 className="text-white font-semibold text-base font-montserrat">
            {title}
          </h6>
          <span
            className={`text-white text-xs px-2 py-1 rounded ${
              statusColors[status] || statusColors.default
            }`}
          >
            {status}
          </span>
        </div>

        <p className="text-white text-opacity-70 text-sm mb-2 line-clamp-2">
          {description}
        </p>

        <div className="mt-auto">
          {price && (
            <div className="flex items-center gap-1 mb-1">
              <svg
                className="text-red-600 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927C9.349 2.205 10.651 2.205 10.951 2.927L12.908 7.478C13.095 7.926 13.54 8.211 14.016 8.211H19.157C19.905 8.211 20.288 9.24 19.655 9.727L15.175 13.09C14.839 13.38 14.679 13.818 14.781 14.247L15.406 19.347C15.618 20.183 14.793 20.854 14.012 20.471L10 18.109L5.988 20.471C5.207 20.854 4.382 20.183 4.594 19.347L5.219 14.247C5.321 13.818 5.161 13.38 4.825 13.09L0.345 9.727C-0.288 9.24 0.095 8.211 0.843 8.211H5.984C6.46 8.211 6.905 7.926 7.092 7.478L9.049 2.927Z" />
              </svg>
              <span className="text-white text-sm">{price} ETH</span>
            </div>
          )}

          {releaseDate && (
            <div className="flex items-center gap-1">
              <svg
                className="text-red-600 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 10h5v5H7z" />
                <path
                  fillRule="evenodd"
                  d="M6 4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H6zm0 2h12v12H6V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-white text-sm">{releaseDate}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
