/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: {
      screens: {
        'sm-custom': '390px',  // Adding custom screen size
      },
    },
  },
  plugins: [],
}