/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-greyRegister': '#A3A48F',
      },
      fontFamily: {
        'inknut': ['"Inknut Antiqua"', 'serif'],
      }
    },
  },
  plugins: [],
}