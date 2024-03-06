/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html"],
  theme: {
    extend: {
      backgroundImage: {
        "header-bg":
          "linear-gradient(to right, rgba(0, 0, 0, .3) 0%, rgba(0, 0, 0, .8) 100%),url(../resources/bg_header.jpeg)",
        "sticker-bg":
          "linear-gradient(to right, rgba(0, 0, 0, .3) 0%, rgba(0, 0, 0, .8) 100%),url(../resources/bg_sticker.jpeg)",
      },
    },
  },
  plugins: [],
};
