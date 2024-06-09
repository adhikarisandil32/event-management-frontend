/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      center: true,
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1200px",
      },
    },
  },
  plugins: [],
}
