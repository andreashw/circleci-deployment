/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.tsx",
    "./components/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        inactive: "var(--c-inactive)",
        danger: '#f00'
      }
    },
  },
  plugins: [],
}
