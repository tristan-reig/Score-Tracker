/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    width: ["responsive", "hover", "focus"]
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
}