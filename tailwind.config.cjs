/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "var(--color-background)",
        },
        primary: {
          dark: "var(--color-primary-dark)",
          DEFAULT: "var(--color-primary)",
          light: "var(--color-primary-light)",
        },
        card: {
          dark: "var(--color-card-dark)",
          DEFAULT: "var(--color-card)",
          light: "var(--color-card-light)",
        },
        neutral: {
          dark: "var(--color-neutral-dark)",
          DEFAULT: "var(--color-neutral)",
          light: "var(--color-neutral-light)",
        },
        text: {
          DEFAULT: "var(--color-text)",
        },
        light: {
          DEFAULT: "var(--color-light)",
        },
        dark: {
          DEFAULT: "var(--color-dark)",
        },
        success: {
          dark: "var(--color-success-dark)",
          DEFAULT: "var(--color-success)",
        },
        danger: {
          dark: "var(--color-danger-dark)",
          DEFAULT: "var(--color-danger)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
        },
      },
    },
  },
  plugins: [],
}