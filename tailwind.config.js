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
          primary: '#881337',       // Royal Deep Maroon / Rose 900
          rose: '#BE123C',          // Rich Magenta Rose 700
          accent: '#E11D48',        // Vibrant Rose 600 (CTA & Highlights)
          green: '#059669',         // High Converting Checkout & WhatsApp Green
          gold: '#D97706',          // Warm Amber / Gold
          goldLight: '#F59E0B',     // Bright Gold
          surface: '#FFF5F6',       // Soft Luxury Rose Tinted White
          card: '#FFFFFF',          // Pure White Card
          border: '#FFE4E6',        // Rose 100 Border
          dark: '#1C1917',          // Warm Charcoal
          muted: '#64748B',         // Slate 500
        }
      },
      fontFamily: {
        sans: ['"Hind Siliguri"', 'Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -5px rgba(136, 19, 55, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.03)',
        'luxury-hover': '0 20px 40px -10px rgba(190, 18, 60, 0.18), 0 10px 15px -4px rgba(0, 0, 0, 0.05)',
        'rose-glow': '0 0 25px -4px rgba(225, 29, 72, 0.35)',
        'gold-glow': '0 0 25px -4px rgba(245, 158, 11, 0.35)',
      }
    },
  },
  plugins: [],
}
