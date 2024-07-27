/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
        xs: '360px',
      },
    },
    extend: {
      colors: {
        blue: {
          100: '#B4C6EE',
          400: '#417BFF',
          500: '#3371FF',
        },
        red: {
          400: '#DD4F56',
          500: '#DC4349',
        },
        dark: {
          100: '#09111F',
          200: '#0B1527',
          300: '#0F1C34',
          350: '#12213B',
          400: '#27344D',
          500: '#2E3D5B',
        },
      },
      fontFamily: {
        sans: ['Poppins', ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}