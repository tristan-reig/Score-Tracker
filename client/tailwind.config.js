/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {pattern: /bg-(red|green|emerald|blue|yellow|orange|gray|pink)-(100|200|300|400|500|600|700|800|900)/},
    {pattern: /mt-(1|2|3|4|5|6|7|8|9|10)4/},
    {pattern: /grid-cols-(3|4|5|6)/},
  ],
  theme: {
    extend: {
      fontFamily: {
        'title' : ["Gobold Thin"],
        'pseudo' : ["Industry Bold"]
      }
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
}