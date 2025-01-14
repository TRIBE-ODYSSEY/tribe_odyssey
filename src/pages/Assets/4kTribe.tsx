import React, { useEffect, useState } from 'react';
import PageTitle from '@src/components/common/PageTitle';
import PageLayout from '@src/components/common/layout/PageLayout';
import { motion, AnimatePresence } from 'framer-motion';

const FourKTribePage: React.FC = () => {
  useEffect(() => {
    document.title = "4K Tribe | Assets";
  }, []);

  const [tribeId, setTribeId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setTribeId(value);
    setError('');
    setImageUrl('');
    setShowPreview(false);
  };

  const handleView = async () => {
    if (!tribeId) {
      setError('Please enter a Tribe ID');
      return;
    }

    const url = `https://cdn.0xworld.io/tribe-images-hr/${tribeId}.png`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Invalid Tribe ID');
      
      setImageUrl(url);
      setShowPreview(true);
      setError('');
    } catch (err) {
      setError('Invalid Tribe ID');
      setImageUrl('');
      setShowPreview(false);
    }
  };

  const handleDownload = async () => {
    if (!tribeId) {
      setError('Please enter a Tribe ID');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`https://cdn.0xworld.io/tribe-images-hr/${tribeId}.png`);
      if (!response.ok) throw new Error('Invalid Tribe ID');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tribe-${tribeId}-4k.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setError('');
    } catch (err) {
      setError('Invalid Tribe ID');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-20">
        <div className="w-full max-w-[960px] mx-auto space-y-12">
          <PageTitle>Tribe Digital Assets</PageTitle>

          <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-white/5 p-6 sm:p-8 md:p-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/90 mb-8 text-center">
              Your Tribe
            </h2>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={tribeId}
                  onChange={handleInputChange}
                  placeholder="Enter Tribe ID"
                  className="w-full sm:flex-1 px-4 py-3 bg-black/40 border border-white/10 rounded-lg 
                           text-white placeholder-white/50 focus:outline-none focus:border-white/20
                           transition-all duration-200"
                  maxLength={7}
                />
                <div className="flex gap-3 sm:flex-shrink-0">
                  <button
                    onClick={handleView}
                    className="flex-1 sm:flex-initial px-6 py-3 bg-red-600 hover:bg-red-700 
                             text-white rounded-lg transition-colors duration-200 whitespace-nowrap"
                  >
                    View
                  </button>
                  <button
                    onClick={handleDownload}
                    disabled={isLoading}
                    className={`flex-1 sm:flex-initial px-6 py-3 bg-gray-600 hover:bg-gray-700 
                              text-white rounded-lg transition-colors duration-200 whitespace-nowrap
                              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Downloading...</span>
                      </div>
                    ) : (
                      'Download'
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center mt-4">
                  {error}
                </p>
              )}
            </div>
          </div>

          {/* Image Preview Modal */}
          <AnimatePresence>
            {showPreview && imageUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8"
                onClick={handleClosePreview}
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  className="relative bg-black/40 backdrop-blur-sm rounded-xl p-4 max-w-4xl w-full mx-auto"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-full flex justify-between items-center mb-4">
                      <h3 className="text-xl text-white/90 font-semibold">
                        Tribe #{tribeId}
                      </h3>
                      <button
                        onClick={handleClosePreview}
                        className="bg-black/50 hover:bg-black/70 text-white/90 
                                 rounded-full p-2 transition-colors duration-200"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="relative w-full aspect-square max-h-[70vh] overflow-hidden rounded-lg">
                      <img
                        src={imageUrl}
                        alt={`Tribe ${tribeId}`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>

                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={handleDownload}
                        disabled={isLoading}
                        className={`px-6 py-3 bg-red-600 hover:bg-red-700 
                                  text-white rounded-lg transition-colors duration-200
                                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            <span>Downloading...</span>
                          </div>
                        ) : (
                          'Download 4K Image'
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageLayout>
  );
};

export default FourKTribePage;
