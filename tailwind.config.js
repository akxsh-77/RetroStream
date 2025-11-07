/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a', // Darkest background
        surface: '#141414',    // For cards, modals, and distinct sections
        primary: '#E50914',    // Netflix red for accents, buttons, highlights
        'primary-hover': '#d90429', // Slightly darker red for hover states
        text: '#e5e5e5',       // Light text for readability
        'text-secondary': '#c7c7c7', // Secondary light text
        'text-dark': '#737373', // Darker text for less emphasis
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'netflix': '0 4px 15px rgba(0, 0, 0, 0.5)',
        'netflix-light': '0 2px 8px rgba(0, 0, 0, 0.3)',
      },
      transitionProperty: {
        'colors-shadow': 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
      }
    },
  },
  plugins: [],
}
