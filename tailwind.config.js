/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        white: "#A8ABBE",
        peach: "#E2C2B3",
        shade: "#F7F3F4",
        gray: "#697478",
        dark: "#1E1F25",
        grayed: "#6b7280",
      },
      fontFamily: {
        inter: ["var(--inter)"],
      },
    },
  },
  plugins: [],
};
