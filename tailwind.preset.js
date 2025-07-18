/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        inverted: "#F2F2F2",
        primary: "#272727",
        secondary: "#015BD6",
        disabled: "#ABABAB",
        error: {
          default: "#DC2626",
          70: "#B91C1C",
        },
        "bright-blue": {
          default: "#0166F4",
          hover: "#0150B9",
          disabled: "#B6D0FC",
          pressed: "#003B7E",
          10: "#B6D0FC",
        },
        neutral: {
          default: "#272727",
          pressed: "#272727",
          hover: "#5E5E5E",
          disabled: "#ABABAB",
          10: "#E3E3E3",
        },
      },
      boxShadow: {
        "quantity-selector": "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
      },
    },
  },
  plugins: [],
};
