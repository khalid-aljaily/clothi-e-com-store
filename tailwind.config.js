/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'ntegral-CF':['ntegral CF'],
        'Satoshi-medium':['Satoshi-medium'],
        'Satoshi-regular':['Satoshi'],
        'Satoshi-bold':['Satoshi-bold'],
      },
      screens:{
        'xs':'420px'
      },
      gridTemplateColumns:{
        'mine':'repeat(2,minmax(200px,1fr))'
      }
    },
  },
  plugins: [],
}

