/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontWeight: {
      100: 100,
      200: 200,
      300: 300,
      400: 400,
      500: 500,
      600: 600,
      700: 700,
      800: 800,
      900: 900,
    },
    extend: {
      colors: {
        brand: {
          60: "hsl(286 100% 49%)",
          30: "hsl(311 96% 43%)",
          10: "hsl(25 100% 50%)",
        },
        surface: {
          100: "hsl(180 14% 06%)",
          200: "hsl(180 14% 10%)",
          300: "hsl(180 14% 15%)",
          400: "hsl(180 14% 32%)",
          500: "hsl(180 14% 45%)",
          600: "hsl(180 14% 64%)",
          700: "hsl(180 14% 83%)",
          800: "hsl(180 14% 94%)",
          900: "hsl(180 14% 96%)",
        },
      },
      opacity: {
        99: "0.99",
      },
      backgroundImage: {
        "gradient-100":
          "linear-gradient(210deg, theme(colors.brand.10), theme(colors.brand.30), theme(colors.brand.60))",
      },
    },
  },
  plugins: [],
};
