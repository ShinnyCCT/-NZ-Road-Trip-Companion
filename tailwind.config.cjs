/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}", // 掃描根目錄和所有子目錄下的所有 React 檔案
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}