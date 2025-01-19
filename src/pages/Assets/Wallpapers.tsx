import React, { useState, useRef, useEffect } from 'react';
import PageLayout from '@src/components/common/layout/PageLayout';
import { Switch } from '@headlessui/react';
import date from 'date-and-time';

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
  const [currentTime, setCurrentTime] = useState(new Date());

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

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Get logo paths based on type
  const getLogoPath = (type: string) => {
    switch(type) {
      case 'red':
        return '/images/logored.png';
      case 'white':
        return '/images/logowhite.png';
      case 'black':
        return '/images/logoblack.png';
      default:
        return '';
    }
  };

  // Canvas update effect
  useEffect(() => {
    if (canvasRef.current && imageLoaded && bannerImage) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set dimensions
      const width = isDesktop ? 543 : 282;
      const height = isDesktop ? 351 : 611;
      canvas.width = width;
      canvas.height = height;

      // Clear canvas
      ctx.fillStyle = '#111014';
      ctx.fillRect(0, 0, width, height);

      // Draw image with scaling
      const scaledWidth = width * (imageScale / 100);
      const scaledHeight = height * (imageScale / 100);
      const x = (width - scaledWidth) / 2;
      const y = (height - scaledHeight) / 2;
      
      ctx.drawImage(bannerImage, x, y, scaledWidth, scaledHeight);

      // Apply device mask
      const maskImg = new Image();
      maskImg.src = isDesktop ? '/images/maskLaptop.png' : '/images/maskMobile.png';
      
      maskImg.onload = () => {
        ctx.drawImage(maskImg, 0, 0, width, height);

        // Add time overlay for mobile
        if (!isDesktop) {
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '14px SF Pro Display';
          ctx.textAlign = 'center';
          
          // Status bar time
          ctx.fillText(date.format(currentTime, 'hh:mm A'), width/2, 25);
          
          // Lock screen time and date
          ctx.font = 'bold 48px SF Pro Display';
          ctx.fillText(date.format(currentTime, 'hh:mm'), width/2, height/3);
          
          ctx.font = '16px SF Pro Display';
          ctx.fillText(date.format(currentTime, 'dddd, MMMM D'), width/2, height/3 + 30);
        }

        // Draw logo if selected
        if (logoType !== 'none') {
          const logoImg = new Image();
          logoImg.src = getLogoPath(logoType);
          
          logoImg.onload = () => {
            const logoWidth = width * (logoScale / 100);
            const logoHeight = (logoWidth * logoImg.height) / logoImg.width;
            const logoX = (width - logoWidth) / 2;
            const logoY = height * (logoPosition / 100);
            
            ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
          };
        }
      };
    }
  }, [imageLoaded, bannerImage, imageScale, logoScale, logoPosition, logoType, isDesktop, currentTime]);

  return (
    <PageLayout>
      <div className="min-h-screen bg-[var(--color-background)] py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
              Tribe NFT Wallpapers
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Create custom wallpapers featuring your Tribe NFT for both desktop and mobile devices.
            </p>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-12 items-start justify-center max-w-6xl mx-auto">
            {/* Left Panel - Controls */}
            <div className="w-full lg:w-[400px] sticky top-6">
              <div className="bg-[var(--color-overlay-dark)] backdrop-blur-xl 
                            border border-[var(--color-text-primary)]/10 
                            rounded-3xl p-8 space-y-8">
                {/* Ape ID Input */}
                <div className="space-y-3">
                  <label className="text-[var(--color-text-primary)] font-medium block">
                    Tribe Ape ID
                  </label>
                  <input
                    type="text"
                    value={apeId}
                    onChange={(e) => setApeId(e.target.value)}
                    className="w-full px-4 py-3 
                              bg-[var(--color-secondary)] 
                              border border-[var(--color-text-primary)]/20 
                              rounded-xl
                              text-[var(--color-text-on-dark)]
                              placeholder-[var(--color-text-muted)]
                              focus:border-[var(--color-button-primary)]
                              focus:ring-2 
                              focus:ring-[var(--color-button-primary)]/20
                              outline-none 
                              transition-all duration-200"
                    placeholder="Enter your Ape ID"
                  />
                </div>

                {apeId && (
                  <>
                    {/* Format Switch */}
                    <div className="flex items-center justify-center p-3 
                                  bg-[var(--color-background)]/30 rounded-2xl">
                      <span className={`mr-3 transition-colors duration-200
                        ${!isDesktop ? 'text-[var(--color-text-primary)]' 
                                   : 'text-[var(--color-text-secondary)]'}`}>
                        Mobile
                      </span>
                      <Switch
                        checked={isDesktop}
                        onChange={setIsDesktop}
                        className={`${isDesktop ? 'bg-[var(--color-button-primary)]' 
                                               : 'bg-[var(--color-text-primary)]/20'}
                                  relative inline-flex h-6 w-11 items-center rounded-full 
                                  transition-colors duration-300 focus:outline-none`}
                      >
                        <span
                          className={`${isDesktop ? 'translate-x-6' : 'translate-x-1'}
                                    inline-block h-4 w-4 transform rounded-full 
                                    bg-white transition-transform duration-300`}
                        />
                      </Switch>
                      <span className={`ml-3 transition-colors duration-200
                        ${isDesktop ? 'text-[var(--color-text-primary)]' 
                                  : 'text-[var(--color-text-secondary)]'}`}>
                        Desktop
                      </span>
                    </div>

                    {/* Controls */}
                    <div className="space-y-6">
                      {/* Logo Selection */}
                      <div className="space-y-3">
                        <label className="text-[var(--color-text-primary)] font-medium block">
                          Logo Style
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                          {['none', 'white', 'black', 'red'].map((type) => (
                            <button
                              key={type}
                              onClick={() => setLogoType(type)}
                              className={`p-3 rounded-xl border transition-all duration-200
                                ${logoType === type 
                                  ? 'border-[var(--color-button-primary)] bg-[var(--color-button-primary)]/10' 
                                  : 'border-[var(--color-text-primary)]/20 hover:border-[var(--color-text-primary)]/40'
                                }`}
                            >
                              <span className="text-sm capitalize text-[var(--color-text-primary)]">
                                {type}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Sliders */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <label className="text-[var(--color-text-primary)]">Image Scale</label>
                            <span className="text-[var(--color-text-secondary)]">{imageScale}%</span>
                          </div>
                          <input
                            type="range"
                            min="50"
                            max="200"
                            value={imageScale}
                            onChange={(e) => setImageScale(Number(e.target.value))}
                            className="w-full accent-[var(--color-button-primary)]"
                          />
                        </div>

                        {logoType !== 'none' && (
                          <>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <label className="text-[var(--color-text-primary)]">Logo Scale</label>
                                <span className="text-[var(--color-text-secondary)]">{logoScale}%</span>
                              </div>
                              <input
                                type="range"
                                min="50"
                                max="200"
                                value={logoScale}
                                onChange={(e) => setLogoScale(Number(e.target.value))}
                                className="w-full accent-[var(--color-button-primary)]"
                              />
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <label className="text-[var(--color-text-primary)]">Logo Position</label>
                                <span className="text-[var(--color-text-secondary)]">{logoPosition}%</span>
                              </div>
                              <input
                                type="range"
                                min="50"
                                max="200"
                                value={logoPosition}
                                onChange={(e) => setLogoPosition(Number(e.target.value))}
                                className="w-full accent-[var(--color-button-primary)]"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={handleCreateWallpaper}
                      disabled={isLoading || !imageLoaded}
                      className={`w-full py-4 px-6 rounded-xl font-medium
                                transition-all duration-300
                                ${isLoading || !imageLoaded 
                                  ? 'bg-[var(--color-button-disabled)] cursor-not-allowed' 
                                  : 'bg-[var(--color-button-primary)] hover:bg-[var(--color-button-hover)]'
                                } text-[var(--color-text-on-primary)]`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          <span>Loading...</span>
                        </div>
                      ) : (
                        'Create Wallpaper'
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Right Panel - Preview */}
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={isDesktop ? 543 : 282}
                  height={isDesktop ? 351 : 611}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-[var(--color-text-secondary)]">
                      Enter your Tribe Ape ID to preview
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default WallpaperPage;