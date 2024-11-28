import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'burnt-orange': '#D35400',
        primary: {
          DEFAULT: 'rgb(10, 122, 255)',
          blue: 'rgb(10, 122, 255)',
          light: 'rgb(86, 181, 254)'
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)'],
        mono: ['var(--font-courier)'],
        'tiro-bangla': ['var(--font-tiro-bangla)'],
        montserrat: ['var(--font-montserrat)'],
        'open-sans': ['var(--font-opensans)'],
        lato: ['var(--font-lato)'],
        roboto: ['var(--font-roboto)'],
        'luckiest-guy': ['var(--font-luckiest-guy)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
