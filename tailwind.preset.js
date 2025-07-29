/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        inverted: "#F2F2F2",
        primary: "#272727",
        secondary: "#015BD6",
        disabled: "#ABABAB",
        light: "#777777",
        error: {
          default: "#DC2626",
          70: "#B91C1C",
          5: "#FEF2F2",
        },
        "bright-blue": {
          default: "#0166F4",
          hover: "#0150B9",
          disabled: "#B6D0FC",
          pressed: "#003B7E",
          10: "#B6D0FC",
          5: "#F2F3FF",
        },
        neutral: {
          "00": "#FAFAFA",
          default: "#272727",
          pressed: "#272727",
          hover: "#5E5E5E",
          disabled: "#ABABAB",
          10: "#E3E3E3",
          70: "#5E5E5E",
          90: "#272727",
        },
        info: {
          10: "#DBEAFE",
          20: "#BFDBFE",
          50: "#3B82F6",
        },
        warning: {
          10: "#FEF3C7",
          40: "#FBBF24",
          50: "#F59E0B",
        },
        success: {
          10: "#DCFCE7",
          40: "#4ADE80",
          50: "#22C55E",
        },
        product: {
          60: "#268753",
          70: "#973F69",
        },
        "core-neutral-grey": {
          300: "#D6D6D6",
          500: "#737373",
          600: "#525252",
          800: "#333333",
        },
      },
      boxShadow: {
        "quantity-selector": "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        modal: "0 4px 25.8px rgba(51, 51, 51, 0.10)",
      },
    },
  },
  plugins: [],
};
