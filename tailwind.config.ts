import type { Config } from "tailwindcss";
import fluid, { screens, fontSize, extract } from 'fluid-tailwind'

export default {
  content: { 
    files: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    extract,
  },
  theme: {
    screens,
    fontSize,
    extend: {
      screens: {
        '5xl': '120rem',    // 1920px
        '6xl': '128rem',    // 2048px
        '7xl': '160rem',    // 2560px
        '8xl': '200rem',    // 3200px
        '9xl': '240rem',    // 3840px
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'burnt-orange': '#FF5816',
        'burnt-orange-dark': '#E54E14',
        'jason-aqua': '#51c4cb',
        primary: {
          DEFAULT: 'rgb(10, 122, 255)',
          blue: 'rgb(10, 122, 255)',
          light: 'rgb(86, 181, 254)'
        },
        'orange-gradient-start': '#ff4a27',
        'orange-gradient-end': '#ff6827',
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
        'playfair-display': ['var(--font-playfair-display)'],
        'bebas-neue': ['var(--font-bebas-neue)'],
        'source-serif': ['var(--font-source-serif)'],
      },
    },
  },
  plugins: [fluid],
} satisfies Config;
