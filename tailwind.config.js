/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)', 'system-ui'],
        montserrat: ['var(--font-montserrat)', 'system-ui'],
        courier: ['var(--font-courier)', 'monospace'],
        'tiro-bangla': ['var(--font-tiro-bangla)'],
        'luckiest-guy': ['var(--font-luckiest-guy)'],
      },
      colors: {
        'burnt-orange': '#FF5733',
        'burnt-orange-dark': '#E64A2E',
      },
    },
  },
  plugins: [],
}
