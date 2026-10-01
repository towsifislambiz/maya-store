/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B0F19',
          surface: '#121826',
          card: '#1A2234',
          border: '#2A364F',
          primary: '#0F172A',
          accent: '#10B981', // High converting green for orders
          gold: '#F59E0B',
          cyan: '#06B6D4',
          red: '#EF4444'
        }
      },
      fontFamily: {
        sans: ['"Hind Siliguri"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        'luxury-hover': '0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 8px 10px -4px rgba(0, 0, 0, 0.06)',
        'dark-glow': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
      }
    },
  },
  plugins: [],
}
