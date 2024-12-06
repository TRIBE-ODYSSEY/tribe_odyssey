import React from "react";

interface DonationSuccessProps {
  open: boolean;
  onClose: () => void;
  amount: string;
}

export const DonationSuccess: React.FC<DonationSuccessProps> = ({
  open,
  onClose,
  amount,
}) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#181818] rounded-lg border border-white border-opacity-10 max-w-sm w-full m-2 p-6 animate-scaleIn">
        <div className="text-center py-4">
          <div className="w-16 h-16 mx-auto mb-4 text-[#4CAF50] animate-scaleIn">
            <svg
              className="w-full h-full"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 
                10-10S17.52 2 12 2zm-1 17.93c-4.95-.49-8.93-4.98-8.44-9.93.49-4.95 
                4.98-8.93 9.93-8.44 4.95.49 8.93 4.98 
                8.44 9.93-.49 4.95-4.98 8.93-9.93 8.44z"
                clipRule="evenodd"
              />
              <path d="M10 17l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <h5 className="text-2xl font-semibold text-white mb-2">Thank You!</h5>
          <p className="text-gray-400 mb-3">
            Your donation of ${amount} will help provide a hoodie to someone in
            need.
          </p>
          <button
            onClick={onClose}
            className="bg-[#ff0008] text-white py-3 px-6 rounded-full hover:bg-[#cc0006] transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};