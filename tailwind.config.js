/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#1b1a17',
        'primary': '#e45826',
      },
      fontFamily: {
        'lexend': ['Lexend', 'sans-serif'],
        'lexend-exa': ['Lexend Exa', 'sans-serif'],
      },
    },
  },
  plugins: [],
}