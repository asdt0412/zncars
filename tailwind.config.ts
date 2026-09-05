import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0A",
          soft: "#111111",
          raised: "#181818",
        },
        ivory: {
          DEFAULT: "#F5F5F0",
          muted: "#C8C8C0",
        },
        gold: {
          DEFAULT: "#C9A24B",
          hover: "#D4B05A",
          dim: "#8A7033",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      fontFamily: {
        serif: ["var(--font-chillax)", "system-ui", "sans-serif"],
        sans: ["var(--font-chillax)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxury: "0.28em",
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(201, 162, 75, 0.35)",
      },
      keyframes: {
        "ken-burns": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "30%": { transform: "translate(3%, -1%)" },
          "50%": { transform: "translate(-1%, 2%)" },
          "70%": { transform: "translate(2%, 1%)" },
          "90%": { transform: "translate(-3%, 0)" },
        },
      },
      animation: {
        "ken-burns": "ken-burns 22s ease-out forwards",
        grain: "grain 0.8s steps(2) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
