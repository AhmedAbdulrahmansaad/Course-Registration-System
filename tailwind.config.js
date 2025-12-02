/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f5',
          100: '#d4e8dd',
          200: '#a8d1bb',
          300: '#7cba99',
          400: '#50a377',
          500: '#184A2C', // KKU Green
          600: '#133b23',
          700: '#0e2c1a',
          800: '#091e11',
          900: '#040f08',
        },
        gold: {
          50: '#fef9e7',
          100: '#fef3cf',
          200: '#fde79f',
          300: '#fcdb6f',
          400: '#fbcf3f',
          500: '#D4AF37', // KKU Gold
          600: '#aa8c2c',
          700: '#7f6921',
          800: '#554616',
          900: '#2a230b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Cairo', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
        english: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

