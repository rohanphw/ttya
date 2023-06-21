/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        space: ["Space Grotesk", ...defaultTheme.fontFamily.sans],
        syne: ["Syne", ...defaultTheme.fontFamily.sans],
        labrada: ["Labrada", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
