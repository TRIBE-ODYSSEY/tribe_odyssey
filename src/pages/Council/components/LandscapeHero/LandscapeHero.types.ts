export interface LandscapeHeroProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  description: string;
  overlayType?: 'gradient' | 'pattern' | 'noise';
  parallaxSpeed?: number;
  buttonText?: string;
  buttonLink?: string;
} 