/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
    "./index.html",
    // This path is CRUCIAL for Tailwind to scan your React files
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

