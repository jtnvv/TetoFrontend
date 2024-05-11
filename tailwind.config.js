/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-1': '#F1F1F1',
        'brand-2': '#A3A48F',
        'brand-3': '#8E8E7C',
        'brand-4': '#79796A',
        'brand-5': '#646458',
        'brand-6': '#101010',
      },
      fontFamily: {
        'default': ['"Sora"', 'sans-serif'],
        'logo': ['"Inknut Antiqua"', 'serif'],
      },
      backgroundImage: {
        'bgBrandsSearch': "url('./src/assets/bgBrandsSearch.png')",
        'bgRegisterBrand': "url('./src/assets/bgRegister.png')",
        'bgRegister': "url('./src/assets/bgRegister.png')",
        'bgHome': "url('./src/assets/bgHome.png')",
      },
      screens: {
        'responsive': '1040px',
      }
    },
  },
  plugins: [],
}