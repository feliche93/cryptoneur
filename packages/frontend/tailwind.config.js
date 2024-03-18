/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      'light',
      // "dark",
    ],
  },
  plugins: [require('daisyui'), require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
