import twFormsPlugin from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,tsx,css}"],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#F6288F',
        'brand-secondary': '#0A3B52',
        'brand-base': '#45A0B5',
      }
    },
  },
  plugins: [twFormsPlugin],
}

