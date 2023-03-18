/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(13, 13, 13)",
        // primary: "rgba(15, 15, 15, 1)",
        secondary: "rgba(0, 0, 0,1)",
        tertiary: "#1c1917",
        accent: "rgb(22, 24, 10)",
        accentLighter: "rgb(7, 38, 19)",
      },
      textColor: {
        text_highLight: "#dcfce7",
        text_primary: "#fafaf9",
        text_secondary: "#e7e5e4",
        text_tertiary: "#d6d3d1",
        text_dark: "#a8a29e",
        text_darkest: "#292524",
      },
    },
  },
  plugins: [],
};
