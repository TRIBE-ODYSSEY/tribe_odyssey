import React from 'react';

const ShinyButtonBg: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    viewBox="0 0 142 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <rect x="1" y="1" width="140" height="46" rx="23" fill="white" fillOpacity="0.01"/>
    <rect x="1" y="1" width="140" height="46" rx="23" fill="url(#paint0_radial_595_792)" fillOpacity="0.08"/>
    <rect x="1" y="1" width="140" height="46" rx="23" stroke="white" strokeOpacity="0.1"/>
    <rect x="1" y="1" width="140" height="46" rx="23" stroke="url(#paint2_angular_595_792)"/>
    
    {/* Shine effect */}
    <g filter="url(#filter0_f_595_792)">
      <rect x="1" y="1" width="140" height="46" rx="23" stroke="url(#paint3_angular_595_792)" strokeWidth="0.5"/>
    </g>
    
    <defs>
      <filter id="filter0_f_595_792" x="-4" y="-4" width="150" height="56" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_595_792"/>
      </filter>

      <radialGradient
        id="paint0_radial_595_792"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(71 60) rotate(-90) scale(46 140)"
      >
        <stop stopColor="white" stopOpacity="0.2"/>
        <stop offset="1" stopColor="white" stopOpacity="0"/>
      </radialGradient>

      <radialGradient
        id="paint2_angular_595_792"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(71 24) scale(71 24)"
      >
        <stop offset="0" stopColor="white" stopOpacity="0.4"/>
        <stop offset="0.5" stopColor="white" stopOpacity="0"/>
        <stop offset="1" stopColor="white" stopOpacity="0.4"/>
      </radialGradient>

      <radialGradient
        id="paint3_angular_595_792"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(71 24) scale(71 24)"
      >
        <stop offset="0" stopColor="white" stopOpacity="0.5"/>
        <stop offset="0.5" stopColor="white" stopOpacity="0"/>
        <stop offset="1" stopColor="white" stopOpacity="0.5"/>
      </radialGradient>
    </defs>
  </svg>
);

export default ShinyButtonBg;