import twFormsPlugin from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,tsx,css}"],
  theme: {
    extend: {},
  },
  plugins: [twFormsPlugin],
}

