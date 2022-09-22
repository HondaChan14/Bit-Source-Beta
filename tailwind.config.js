
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      colors: {
        "primary": "#695E93",
        "secondary": "#8155BA",
        "accent": "#281C2D",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {},
}
