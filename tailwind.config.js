/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        dark: 'var(--color-dark)',
        light: 'var(--color-light)',
        cta: 'var(--color-cta)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Barlow Condensed', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
