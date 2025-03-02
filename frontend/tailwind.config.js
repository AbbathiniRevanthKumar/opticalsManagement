/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Outfit", "serif"],
      },
      colors: {
        primary: "#ff8811",
        secondary: "#ffffff",
        background : "#E6E8EC",
        danger : "#f94f14",
        success : "#008c0a",
      },
      
    },
  },
  plugins: [],
};
