import React, { useState, useRef, useEffect } from 'react';
import PageLayout from '@src/components/common/layout/PageLayout';
import { format } from 'date-and-time';
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

  const now = new Date();

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
            <h1 className="text-3xl font-montserrat font-bold text-white">
              Tribe NFT Wallpapers
            </h1>

            <div className="bg-dark-800 rounded-lg p-6 border border-white/10">
              {/* Ape ID Input */}
              <div className="space-y-4">
                <label className="block text-white font-medium">
                  Enter your Tribe Ape ID:
                </label>
                <input
                  type="text"
                  value={apeId}
                  onChange={(e) => setApeId(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-white/20 
                           rounded-lg text-white focus:border-white/40 outline-none"
                  placeholder="Tribe Ape ID"
                />
              </div>

              {apeId && (
                <>
                  {/* Logo Selection */}
                  <div className="mt-6">
                    <select
                      value={logoType}
                      onChange={(e) => setLogoType(e.target.value)}
                      className="w-full px-4 py-3 bg-transparent border border-white/20 
                               rounded-lg text-white focus:border-white/40 outline-none"
                    >
                      <option value="none">No Logo</option>
                      <option value="white">White Logo</option>
                      <option value="black">Black Logo</option>
                      <option value="red">Red Logo</option>
                    </select>
                  </div>

                  {/* Sliders */}
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <label className="text-white">Image Scale</label>
                      <input
                        type="range"
                        min="50"
                        max="200"
                        value={imageScale}
                        onChange={(e) => setImageScale(Number(e.target.value))}
                        className="w-full"
                      />
                      <span className="text-white/70">{imageScale}%</span>
                    </div>

                    {logoType !== 'none' && (
                      <>
                        <div className="space-y-2">
                          <label className="text-white">Logo Scale</label>
                          <input
                            type="range"
                            min="50"
                            max="200"
                            value={logoScale}
                            onChange={(e) => setLogoScale(Number(e.target.value))}
                            className="w-full"
                          />
                          <span className="text-white/70">{logoScale}%</span>
                        </div>

                        <div className="space-y-2">
                          <label className="text-white">Logo Position</label>
                          <input
                            type="range"
                            min="50"
                            max="200"
                            value={logoPosition}
                            onChange={(e) => setLogoPosition(Number(e.target.value))}
                            className="w-full"
                          />
                          <span className="text-white/70">{logoPosition}%</span>
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
                            ? 'bg-red-600/50 cursor-not-allowed' 
                            : 'bg-red-600 hover:bg-red-700'
                          } text-white transition-colors`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white 
                                  rounded-full animate-spin" />
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
              <span className={`mr-2 ${!isDesktop ? 'text-white' : 'text-white/50'}`}>
                Mobile
              </span>
              <Switch
                checked={isDesktop}
                onChange={setIsDesktop}
                className={`${isDesktop ? 'bg-red-600' : 'bg-red-600/50'}
                          relative inline-flex h-6 w-11 items-center rounded-full 
                          transition-colors focus:outline-none`}
              >
                <span
                  className={`${isDesktop ? 'translate-x-6' : 'translate-x-1'}
                            inline-block h-4 w-4 transform rounded-full 
                            bg-white transition-transform`}
                />
              </Switch>
              <span className={`ml-2 ${isDesktop ? 'text-white' : 'text-white/50'}`}>
                Desktop
              </span>
            </div>

            <div className="relative">
              <canvas
                ref={canvasRef}
                className={`mx-auto ${isDesktop ? 'w-[543px] h-[351px]' : 'w-[282px] h-[611px]'}
                          bg-black rounded-lg`}
                width={isDesktop ? 543 : 282}
                height={isDesktop ? 351 : 611}
              />
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="w-8 h-8 border-2 border-white/20 border-t-white 
                                rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default WallpaperPage;
