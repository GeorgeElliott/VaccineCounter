module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      dropShadows: {
        "drop-shadow-lg-yellow-300" : "--tw-drop-shadow: drop-shadow(0 10px 8px rgba(252,211,77, 0.04)) drop-shadow(0 4px 3px rgba(252,211,77, 0.1))"
      }
    },
  },
  variants: {
    extend: {
      animation: ['hover']
    },
  },
  plugins: [],
}
