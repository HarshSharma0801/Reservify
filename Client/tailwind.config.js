/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    
  ],
  theme: {
    extend: {
      colors:{
        'primary' : "#0718C4",
        'secondary': '#687EFF',
        'golden': '#FFC436'
      }
    },
  },
  plugins: [],
}