export interface CouncilFeature {
    title: string;
    desc: string;
    icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  }
  
  export interface HeroContent {
    title: string;
    description: string[];
    ctaLink: string;
    ctaText: string;
  }

  