/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      animation: {
        // Bounces 3 and lands perfectly
        'bounce-short': 'bounce 1s ease-in-out 3.5'
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}