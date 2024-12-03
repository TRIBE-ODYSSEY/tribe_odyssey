// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#ff512f',
        secondary: '#dd2476',
        backgroundDark: '#14121b',
        backgroundPaper: '#1a1825',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        gradientText: 'linear-gradient(180deg, #EBEBEB 0%, rgba(235, 235, 235, 0.8) 100%)',
        gradientButton: 'linear-gradient(90deg, var(--tw-color-primary) 0%, var(--tw-color-secondary) 100%)',
      },
    },
  },
  plugins: [],
};
