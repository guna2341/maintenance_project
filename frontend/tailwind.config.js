import { heroui } from "@heroui/theme"
import scrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        inset: "inset 0 4px 6px rgba(0,0,0,0.2)",
        "inset-lg": "inset 0 8px 12px rgba(0,0,0,0.25)",
      },
      colors: {
        custom: {
          100: "#FBFBFD",
          150: "#F4F5FA",
          200: "#E2B842",
          300: "#161849",
          400: "#00BC31",
          500: "#ED1B24",
          700: "#0074FF",
          800: "#003B83",
          900: "#D32F2F",      
          1000: "#e4e4e4"
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui(), scrollbar({ nocompatible: true })],
};
