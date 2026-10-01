import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "2rem", lg: "3rem" },
      // O padding responsivo só vale para telas listadas aqui
      screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1440px" },
    },
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        sans: ['"Geist Sans"', "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        border: "hsl(var(--line))",
        input: "hsl(var(--line))",
        ring: "hsl(var(--primary))",
        background: "hsl(var(--background))",
        surface: "hsl(var(--surface))",
        line: "hsl(var(--line))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--surface))",
          foreground: "hsl(var(--muted))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--background))",
        },
        rec: "hsl(var(--rec))",
        live: "hsl(var(--live))",
        accent: "hsl(var(--accent))",
        destructive: {
          DEFAULT: "hsl(var(--rec))",
          foreground: "hsl(var(--foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        drift: {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "100%": { transform: "translate(6vw, 8vh) scale(1.15)" },
        },
      },
      animation: {
        marquee: "marquee 60s linear infinite",
        drift: "drift 18s ease-in-out infinite alternate",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
