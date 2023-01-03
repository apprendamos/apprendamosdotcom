/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
        160: "40rem",
      },
      keyframes: {
        outline: {
          "0%": {
            outlineStyle: "solid",
            outlineWidth: "2px",
            outlineOffset: "0px",
          },
          "100%": {
            outlineStyle: "solid",
            outlineWidth: "2px",
            outlineOffset: "8px",
            outlineColor: "rgba(0, 0, 0, 0)",
          },
        },
      },
      animation: {
        outline: "outline 0.8s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
