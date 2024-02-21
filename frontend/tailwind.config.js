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
      colors: {
        'gold1' : "#5d4a1f",
        'gold2' : "#9f7928",
        'gold3' : "#da9100",
        'silver1' : "#4D4855",
        'silver2' : "#4D4855",
        'bronze1' : "#5A2D00",
        'bronze2' : "#804000",
      },
      fontFamily: {
        'title' : ["Gobold Thin"],
        'pseudo' : ["Industry Bold"]
      }
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
}