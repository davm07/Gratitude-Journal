/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#F7EED3",
        primary: "#583B2D",
        secondaryColor: "#FFF8E8",
        tertiaryColor: "#AAB396",
        borderColor: "#8D493A",
      },
    },
  },
  plugins: [],
  debug: true,
};
