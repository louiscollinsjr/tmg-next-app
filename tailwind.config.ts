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
        primary: {
          DEFAULT: 'rgb(10, 122, 255)',
          blue: 'rgb(10, 122, 255)',
          light: 'rgb(86, 181, 254)'
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
        montserrat: ['var(--font-montserrat)'],
        'open-sans': ['var(--font-opensans)'],
        lato: ['var(--font-lato)'],
        roboto: ['var(--font-roboto)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
