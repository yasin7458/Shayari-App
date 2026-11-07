/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shayarana: {
          bg: '#17121C',
          bgSecondary: '#241A24',
          burgundy: '#713B4A',
          burgundyLight: '#8A4A5B',
          burgundyDark: '#562B37',
          roseGold: '#D5AD70',
          roseGoldLight: '#E6C692',
          roseGoldDark: '#B89255',
          dustyRose: '#C78375',
          champagne: '#F2DCC8',
          champagneLight: '#FAF0E6',
          white: '#FFF9F3',
          muted: '#B8A8A5',
          border: 'rgba(213, 173, 112, 0.2)',
          borderHover: 'rgba(213, 173, 112, 0.45)',
          cardBg: 'rgba(36, 26, 36, 0.75)',
          cardBgGlass: 'rgba(23, 18, 28, 0.85)',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cinzel"', 'serif'],
        sans: ['"Outfit"', '"Inter"', 'sans-serif'],
        hindi: ['"Noto Serif Devanagari"', '"Rozha One"', 'serif'],
        gujarati: ['"Noto Serif Gujarati"', '"Anek Gujarati"', 'serif'],
        display: ['"Cinzel"', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(213, 173, 112, 0.25)',
        'gold-glow-lg': '0 0 45px -8px rgba(213, 173, 112, 0.4)',
        'burgundy-glow': '0 0 35px -5px rgba(113, 59, 74, 0.35)',
        'card-luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(213, 173, 112, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'luxury-hero': 'radial-gradient(ellipse at 50% 20%, rgba(113, 59, 74, 0.45) 0%, rgba(36, 26, 36, 0.8) 50%, #17121C 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F2DCC8 0%, #D5AD70 50%, #C78375 100%)',
        'burgundy-gradient': 'linear-gradient(135deg, #713B4A 0%, #3B1B25 100%)',
      }
    },
  },
  plugins: [],
}
