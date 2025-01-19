import React, { useState, useRef, useEffect } from 'react';
import PageLayout from '@src/components/common/layout/PageLayout';
import { Switch } from '@headlessui/react';

const WallpaperPage: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [apeId, setApeId] = useState('');
  const [logoType, setLogoType] = useState('none');
  const [imageScale, setImageScale] = useState(100);
  const [logoScale, setLogoScale] = useState(100);
  const [logoPosition, setLogoPosition] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [bannerImage, setBannerImage] = useState<HTMLImageElement | null>(null);

  const handleCreateWallpaper = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `tribe-${isDesktop ? 'desktop' : 'mobile'}-${apeId}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  // Recursive fetch with retries
  const fetchPlus = async (url: string, options = {}, retries: number) => {
    try {
      const res = await fetch(url, options);
      if (res.ok) return res;
      if (retries > 0) {
        return fetchPlus(url, options, retries - 1);
      }
      throw new Error(res.statusText);
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  };

  // Fetch banner image
  const fetchImageBanner = async () => {
    setImageLoaded(false);

    if (apeId) {
      setIsLoading(true);
      const imageUrl = `https://cdn.0xworld.io/tribe-images/${apeId}.png`;
      
      const response = await fetchPlus(imageUrl, {}, 3);
      if (response) {
        const imgBanner = new Image();
        imgBanner.crossOrigin = "anonymous";
        imgBanner.src = response.url;
        
        imgBanner.onload = () => {
          setImageLoaded(true);
          setBannerImage(imgBanner);
          setIsLoading(false);
        };

        imgBanner.onerror = () => {
          setIsLoading(false);
          setImageLoaded(false);
          setBannerImage(null);
        };
      } else {
        setIsLoading(false);
        setBannerImage(null);
      }
    } else {
      setBannerImage(null);
    }
  };

  // Effect to fetch image when apeId changes
  useEffect(() => {
    fetchImageBanner();
  }, [apeId]);

  // Effect to update canvas when image loads
  useEffect(() => {
    if (canvasRef.current && imageLoaded && bannerImage) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        // Clear canvas
        ctx.fillStyle = '#111014';
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // Draw image
        const width = isDesktop ? 543 : 282;
        const height = isDesktop ? 351 : 611;
        const scaledWidth = width * (imageScale / 100);
        const scaledHeight = height * (imageScale / 100);
        const x = (width - scaledWidth) / 2;
        const y = (height - scaledHeight) / 2;
        
        ctx.drawImage(
          bannerImage,
          x,
          y,
          scaledWidth,
          scaledHeight
        );
      }
    }
  }, [imageLoaded, bannerImage, imageScale, isDesktop]);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-3xl font-montserrat font-bold text-[var(--color-text-on-dark)]">
              Tribe NFT Wallpapers
            </h1>

            <div className="bg-[var(--color-overlay-dark)] backdrop-blur-sm rounded-lg p-6 
                          border border-[var(--color-text-primary)]/10">
              {/* Ape ID Input */}
              <div className="space-y-4">
                <label className="block text-[var(--color-text-on-dark)] font-medium">
                  Enter your Tribe Ape ID:
                </label>
                <input
                  type="text"
                  value={apeId}
                  onChange={(e) => setApeId(e.target.value)}
                  className="w-full px-4 py-3 bg-[var(--color-background)]/80 
                           border border-[var(--color-text-primary)]/20 rounded-lg 
                           text-[var(--color-text-on-dark)] placeholder-[var(--color-text-secondary)]/30 
                           focus:border-[var(--color-text-primary)]/40 
                           focus:ring-1 focus:ring-[var(--color-text-primary)]/40 
                           outline-none transition-all duration-200"
                  placeholder="Tribe Ape ID"
                />
              </div>

              {apeId && (
                <>
                  {/* Logo Selection */}
                  <div className="mt-6">
                    <label className="block text-[var(--color-text-on-dark)] font-medium mb-2">
                      Select Logo Style:
                    </label>
                    <select
                      value={logoType}
                      onChange={(e) => setLogoType(e.target.value)}
                      className="w-full px-4 py-3 bg-[var(--color-background)]/80 
                               border border-[var(--color-text-primary)]/20 rounded-lg 
                               text-[var(--color-text-on-dark)] 
                               focus:border-[var(--color-text-primary)]/40 
                               focus:ring-1 focus:ring-[var(--color-text-primary)]/40 
                               outline-none transition-all duration-200"
                    >
                      <option value="none" className="bg-[var(--color-background)]">No Logo</option>
                      <option value="white" className="bg-[var(--color-background)]">White Logo</option>
                      <option value="black" className="bg-[var(--color-background)]">Black Logo</option>
                      <option value="red" className="bg-[var(--color-background)]">Red Logo</option>
                    </select>
                  </div>

                  {/* Sliders */}
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <label className="text-[var(--color-text-on-dark)]">Image Scale</label>
                      <input
                        type="range"
                        min="50"
                        max="200"
                        value={imageScale}
                        onChange={(e) => setImageScale(Number(e.target.value))}
                        className="w-full accent-[var(--color-button-primary)]"
                      />
                      <span className="text-[var(--color-text-secondary)]/70">{imageScale}%</span>
                    </div>

                    {logoType !== 'none' && (
                      <>
                        <div className="space-y-2">
                          <label className="text-[var(--color-text-on-dark)]">Logo Scale</label>
                          <input
                            type="range"
                            min="50"
                            max="200"
                            value={logoScale}
                            onChange={(e) => setLogoScale(Number(e.target.value))}
                            className="w-full accent-[var(--color-button-primary)]"
                          />
                          <span className="text-[var(--color-text-secondary)]/70">{logoScale}%</span>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[var(--color-text-on-dark)]">Logo Position</label>
                          <input
                            type="range"
                            min="50"
                            max="200"
                            value={logoPosition}
                            onChange={(e) => setLogoPosition(Number(e.target.value))}
                            className="w-full accent-[var(--color-button-primary)]"
                          />
                          <span className="text-[var(--color-text-secondary)]/70">{logoPosition}%</span>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}

              {/* Action Button */}
              <button
                onClick={handleCreateWallpaper}
                disabled={isLoading || !apeId}
                className={`w-full mt-6 py-3 px-6 rounded-lg flex items-center justify-center
                          ${isLoading || !apeId 
                            ? 'bg-[var(--color-button-disabled)] cursor-not-allowed' 
                            : 'bg-[var(--color-button-primary)] hover:bg-[var(--color-button-hover)]'
                          } text-[var(--color-text-on-primary)] transition-colors`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-[var(--color-text-primary)]/20 
                                  border-t-[var(--color-text-primary)] rounded-full animate-spin" />
                    Loading...
                  </div>
                ) : (
                  'Create Wallpaper'
                )}
              </button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="w-full lg:w-1/2">
            <div className="flex justify-center items-center mb-4">
              <span className={`mr-2 ${!isDesktop 
                ? 'text-[var(--color-text-on-dark)]' 
                : 'text-[var(--color-text-on-dark)]/50'}`}>
                Mobile
              </span>
              <Switch
                checked={isDesktop}
                onChange={setIsDesktop}
                className={`${isDesktop 
                  ? 'bg-[var(--color-button-primary)]' 
                  : 'bg-[var(--color-button-primary)]/50'}
                  relative inline-flex h-6 w-11 items-center rounded-full 
                  transition-colors focus:outline-none`}
              >
                <span
                  className={`${isDesktop ? 'translate-x-6' : 'translate-x-1'}
                            inline-block h-4 w-4 transform rounded-full 
                            bg-[var(--color-text-primary)] transition-transform`}
                />
              </Switch>
              <span className={`ml-2 ${isDesktop 
                ? 'text-[var(--color-text-on-dark)]' 
                : 'text-[var(--color-text-on-dark)]/50'}`}>
                Desktop
              </span>
            </div>

            <div className="relative">
              <canvas
                ref={canvasRef}
                width={isDesktop ? 543 : 282}
                height={isDesktop ? 351 : 611}
                className="mx-auto bg-[var(--color-overlay-dark)] rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default WallpaperPage;
