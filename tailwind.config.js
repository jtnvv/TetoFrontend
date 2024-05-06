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
        'inknut': ['"Inknut Antiqua"', 'serif'],
      },
      backgroundImage: {
        'bgBrandsSearch': "url('https://raw.githubusercontent.com/jtnvv/TetoFrontend/main/src/assets/bgBrandsSearch.png')",
        'bgRegisterBrand': "url('https://raw.githubusercontent.com/jtnvv/TetoFrontend/main/src/assets/bgRegister.png')",
        'bgRegister': "url('https://raw.githubusercontent.com/jtnvv/TetoFrontend/main/src/assets/bgRegister.png')",
        'bgHome': "url('https://raw.githubusercontent.com/jtnvv/TetoFrontend/main/src/assets/bgHome.png')",
        'bgMision': "url('https://raw.githubusercontent.com/jtnvv/TetoFrontend/99dbde2595b325dcabe5352fc34ec3607c7fe092/src/assets/AboutUsMisi%C3%B3n.png')",
        'bgVision': "url('https://raw.githubusercontent.com/jtnvv/TetoFrontend/gestionar-publicidad-sobre-nosotros/src/assets/AboutUsVision.png')"
        
      },
    },
  },
  plugins: [],
}