import type { Config } from "tailwindcss";

const COLORS = {

    transparent : 'transparent',
   primary: '#ff512f',
    backgroundDark : '#181818',
    fontone : '#383838',
    ethAddress : '#ebebeb',
} as const;



const KEYFRAMES = {
    fadeInUp : {
        '0%' : { opacity : '0', transform : 'translateY(20px)' },
        '100%' : { opacity : '1', transform : 'translateY(0)' },
    },
    scaleIn : {
        '0%' : { transform : 'scale(0)' },
        '100%' : { transform : 'scale(1)' },
    },
} as const;



const IMAGES = {
    hero: "url('images/hero-bg.webp')",
    error: "url('images/error-bg.png')",
  } as const;

  const config: Config = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './index.html'
    ],
    darkMode: 'class', 
    theme: {
      extend: {
        screens: {
          'xsm': { 'min': '0px', 'max': '320px' },
          'sm': { 'min': '321px', 'max': '767px' },
          'md': { 'min': '768px', 'max': '1023px' },
          'lg': { 'min': '1024px', 'max': '1279px' },
          'xl': { 'min': '1280px', 'max': '1535px' },
          '2xl': { 'min': '1536px' },
          'portrait': { 'raw': '(orientation: portrait)' },
        },
        colors: COLORS,
        fontFamily: {
          montserrat: ['Montserrat', 'sans-serif'],
        },
        backgroundImage: {
          herobg: IMAGES.hero,
          errorBg: IMAGES.error,
        },
        keyframes: KEYFRAMES,
      },
    },
    plugins: [],
    future: {
      hoverOnlyWhenSupported: true,
      respectDefaultRingColorOpacity: true,
    },
    prefix: '',
    important: false, 
    variants: {
      extend: {
        backgroundColor: ['dark', 'dark-hover'],
        textColor: ['dark', 'dark-hover'],
        borderColor: ['dark', 'dark-hover'],
      },
    },
  };

  export default config;


  export type Colors = typeof COLORS;



