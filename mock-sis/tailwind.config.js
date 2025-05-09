/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/views/**/*.ejs",
    // add other paths if needed
  ],
  theme: {
    fontFamily: {
      sans: ['Open Sans', 'ui-sans-serif', 'system-ui'],
    },
    extend: {
      colors: {
        primary: '#003366',
        accent: '#FFD700',
        secondary: '#F5F7FA', // light gray
      },
    },
  },
  plugins: [],
}
