/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Include the UI library components
    "./node_modules/@balto-fr-github/core/dist/**/*.{js,mjs}",
  ],
  // Use the Balto UI preset for consistent styling
  presets: [require("@balto-fr-github/core/tailwind-preset")],
  theme: {
    extend: {
      // Add your custom extensions here
      // The preset already includes:
      // - Inter font family
      // - Custom colors (bright-blue, inverted, primary, secondary, disabled)
      // Example of extending with your own colors:
      // colors: {
      //   brand: {
      //     50: '#f0f9ff',
      //     500: '#3b82f6',
      //     900: '#1e3a8a',
      //   }
      // }
    },
  },
  plugins: [
    // Add any plugins you need
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
};
