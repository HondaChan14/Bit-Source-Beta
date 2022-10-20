
module.exports = {
  content: ["./views/**/*.ejs"],
  daisyui: {
    themes: [
      {
        mytheme: {
        
          "primary": "#5d51b5",
          
          "secondary": "#c6913b",
                   
          "accent": "#e8c1ff",
                   
          "neutral": "#1C161D",
                   
          "base-100": "#3C4044",
                   
          "info": "#29BDDB",
                   
          "success": "#7BEAA4",
                   
          "warning": "#D47E0C",
                   
          "error": "#EB5275",

"purple": "#695E93",
"litepurple": "#8155BA",
"accentpurple": "#281C2D",
"blue": "#5e6e93",
"dark-accent": "#3d2b45",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
