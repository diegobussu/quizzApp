/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-purple": "#FFD6FF",
        "secondary-purple": "#E7C6FF",
        "third-purple": "#C8B6FF",
        "primary-blue": "#B8C0FF",
        "secondary-blue": "#BBD0FF",
      },
    },
  },
  plugins: [],
};
