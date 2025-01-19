import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CheckerPopupProps {
  open: boolean;
  onClose: () => void;
  data: {
    isEligible: boolean;
    message: string;
    assetsValue: string;
    favoriteSpecies: string;
    totalAssets: number;
    progress: number;
    missingSpecies?: string[];
    nanaPoints: number;
  };
}

const CheckerPopup: React.FC<CheckerPopupProps> = ({ open, onClose, data }) => {
  if (!open) return null;

  const progressPercentage = (data.progress / 19) * 100;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Popup Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-[90%] max-w-lg mx-auto bg-[var(--color-secondary)] 
                     border border-[var(--color-text-primary)]/10 rounded-2xl p-6 z-50 
                     text-[var(--color-text-primary)] max-h-[90vh] overflow-y-auto 
                     scrollbar-thin scrollbar-thumb-[var(--color-text-primary)]/10 
                     scrollbar-track-transparent"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[var(--color-text-primary)]/60 
                       hover:text-[var(--color-text-primary)] transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Title */}
            <h2 className="text-2xl font-semibold mb-6 text-[var(--color-text-primary)]">
              Analysis Results
            </h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[var(--color-text-primary)]/5 rounded-lg p-4">
                <p className="text-[var(--color-text-primary)]/60 text-sm">Portfolio Value</p>
                <p className="text-xl font-medium">{data.assetsValue}</p>
              </div>
              <div className="bg-[var(--color-text-primary)]/5 rounded-lg p-4">
                <p className="text-[var(--color-text-primary)]/60 text-sm">Total Assets</p>
                <p className="text-xl font-medium">{data.totalAssets}</p>
              </div>
              <div className="bg-[var(--color-text-primary)]/5 rounded-lg p-4">
                <p className="text-[var(--color-text-primary)]/60 text-sm">Favorite Species</p>
                <p className="text-xl font-medium">{data.favoriteSpecies}</p>
              </div>
              <div className="bg-[var(--color-text-primary)]/5 rounded-lg p-4">
                <p className="text-[var(--color-text-primary)]/60 text-sm">NANA Points</p>
                <p className="text-xl font-medium">{data.nanaPoints}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-[var(--color-text-primary)]/60">Progress</span>
                <span className="text-[var(--color-text-primary)]/60">{data.progress}/19</span>
              </div>
              <div className="h-2 bg-[var(--color-text-primary)]/10 rounded-full overflow-hidden">
                <div
                  className={`h-full ${data.isEligible 
                    ? 'bg-[var(--color-button-primary)]' 
                    : 'bg-red-500'} 
                    transition-all duration-1000 ease-out`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Missing Species */}
            {!data.isEligible && data.missingSpecies && data.missingSpecies.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-3">Missing Species</h3>
                <div className="grid grid-cols-2 gap-2">
                  {data.missingSpecies.map((species) => (
                    <div
                      key={species}
                      className="bg-[var(--color-text-primary)]/5 rounded-lg px-3 py-2 
                               text-sm text-[var(--color-text-primary)]/80"
                    >
                      {species}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Status Message */}
            <div className={`mt-6 p-4 rounded-lg border ${
              data.isEligible 
                ? 'bg-[var(--color-button-primary)]/5 border-[var(--color-button-primary)]/50' 
                : 'bg-[var(--color-button-disabled)]/5 border-[var(--color-button-disabled)]/50'
            }`}>
              <p className="text-center">{data.message}</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckerPopup;