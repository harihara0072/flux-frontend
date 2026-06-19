/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
    "./index.html",
    // This path is CRUCIAL for Tailwind to scan your React files
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      fontFamily: {
        // Use a modern, clean font for the main body (Inter is a popular clean sans-serif)
        sans: ['Inter', 'sans-serif'],
        // Keep 'marker' for the handwritten/scribble accents
        marker: ['Permanent Marker', 'cursive'],
      },
colors: {
        'brand-primary': '#059669',
        'brand-accent': '#10b981',

        // 💥 FINAL CHANGE: Change pure white to a warm, subtle off-white 💥
        'light-bg': '#fcfcfc', // Very light, slightly warm gray/white

        'dark-text': '#333333',
        'neutral-light': '#f3f4f6',
      },
    },
  },
  plugins: [],
}

