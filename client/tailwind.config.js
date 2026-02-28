/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        netflix: {
          red: "#e50914",
          black: "#111111",
          panel: "rgba(0, 0, 0, 0.75)",
        },
      },
    },
  },
  plugins: [],
};
