/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "light-silver": "#F1F3F4",
        "dark-white": "rgba(255,255,255,1)",
        "sky-blue": "#E8F0FE",
        "dark-silver": "#F5F5F5",
        blue: "#1973E8",
      },
      textColor: {
        gray: "#5f6368",
        blue: "#174ea6",
        "light-blue": "#508EEB",
        "dark-gray": "#3c4043",
      },
      fontFamily: {
        regular: "Poppins",
        medium: "Poppins-Medium",
        bold: "Poppins-Bold",
      },
      gridTemplateColumns: {
        header: "280px 1fr 0.3fr",
        contact: "0.25fr 0.25fr 0.2fr 0.2fr 0.1fr",
      },
      height: {
        header: "64px",
        search: "46px",
        create: "48px",
        contact: "calc(100% - 64px)",
      },
      width: {
        sidebar: "280px",
        contact: "calc(100% - 280px)",
      },
      boxShadow: {
        search:
          "0 1px 1px 0 rgba(65,69,73,0.3),0 1px 3px 1px rgba(65,69,73,0.15)",
        create:
          "0 1px 2px 0 rgba(60,64,67,.302),0 1px 3px 1px rgba(60,64,67,.149)",
        "create-hover":
          "0 1px 3px 0 rgba(60,64,67,.302),0 4px 8px 3px rgba(60,64,67,.149)",
      },
      translate: {
        sidebar: "280px",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
