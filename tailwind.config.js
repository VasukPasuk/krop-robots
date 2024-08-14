/** @type {Partial<CustomThemeConfig & {extend: Partial<CustomThemeConfig>}> & DefaultTheme} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
    screens: {
      "s320": "320px",
      // => @media (min-width: 320px) { ... }
      
      "s360": "360px",
      // => @media (min-width: 360px) { ... }
      
      "s420": "420px",
      // => @media (min-width: 420px) { ... }
      
      "s480": "480px",
      // => @media (min-width: 480px) { ... }
      ...defaultTheme.screens,
    }
  },
  plugins: [],
}