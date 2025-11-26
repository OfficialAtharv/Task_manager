/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },

  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
        }
      }
    ],
    base: true,
    styled: true,
    utils: true,
    logs: true,
    darkTheme: "dark"
  }
};
