/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#1A1A1A",
        wood: "#2D241E",
        gold: "#C5A059",
        chrome: "#A1A1AA",
      },
      fontFamily: {
        brand: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        'rustic-luxury': "url('/assets/hero-bg.jpg')",
      }
    },
  },
  plugins: [],
}
