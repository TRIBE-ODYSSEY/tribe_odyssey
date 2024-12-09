// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  autoprefixer: true,
  darkMode: true,
  theme: {
    extend: {
      colors: {
        primary: '#ff512f',
        secondary: '#dd2476',
        backgroundDark: '#14121b',
        
        backgroundPaper: '#1a1825',
        success: '#4CAF50',
        danger: '#ff0008',
        dangerHover: '#cc0006',
        ethAddress: '#ebebeb',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        gradientText:
          'linear-gradient(180deg, #EBEBEB 0%, rgba(235, 235, 235, 0.8) 100%)',
        gradientButton:
          'linear-gradient(90deg, var(--tw-color-primary) 0%, var(--tw-color-secondary) 100%)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease forwards',
        fadeInUpDelay200: 'fadeInUp 0.6s ease forwards 0.2s',
        fadeInUpDelay400: 'fadeInUp 0.6s ease forwards 0.4s',
        fadeInUpDelay600: 'fadeInUp 0.6s ease forwards 0.6s',
        scaleIn: 'scaleIn 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
 