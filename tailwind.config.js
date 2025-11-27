// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // 確保這些路徑與您的專案結構相符
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}