// tailwind.config.ts
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', '"Cubic 11"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        pacmanYellow: "#FFCC00",
        ghostRed: "#FF0000",
        ghostBlue: "#00FFFF",
        ghostPink: "#FFB8FF",
        ghostOrange: "#FF9900",
        star: "#FFD700",
        darkBg: "#000000",
      },
      animation: {
        wiggle: "wiggle 0.3s ease-in-out infinite",
        shoot: "shoot 0.6s ease-in-out forwards",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        shoot: {
          "0%": {
            transform: "translateY(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-150px) scale(0.5)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;