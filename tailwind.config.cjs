/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'chess-col': 'repeat(8, 60px)'
      },
      gridTemplateRows: {
        'chess-row': 'repeat(8, 60px)'
      }
    },
  },
  plugins: [],
}
