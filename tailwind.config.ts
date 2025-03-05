import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'
import scrollbarHide from 'tailwind-scrollbar-hide'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E59F00',
        secondary: '#063354',
        neutral: '#F3C65D',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
    },
  },
  plugins: [forms, scrollbarHide],
}

export default config
