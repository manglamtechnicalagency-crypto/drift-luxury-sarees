import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          base: "#FAF7F2",
          surface: "#F4EFE6",
          dark: "#EDE6D8",
        },
        wine: {
          deep: "#2B070E",
          burgundy: "#4A0E17",
          muted: "#380B13",
        },
        crimson: {
          royal: "#A80F24",
          bright: "#C81630",
          dark: "#7A0A19",
        },
        zari: {
          gold: "#D4AF37",
          bright: "#E6B83A",
          light: "#F7E096",
          dark: "#997A1E",
        },
        charcoal: {
          ink: "#1A1617",
          card: "#211D1E",
          deep: "#120F10",
        },
        sand: {
          hairline: "#E6DFD5",
          border: "#DCD3C5",
          muted: "#C8BEAD",
        },
        drift: {
          dark: "#0b0c10",
          charcoal: "#15171e",
          card: "#191b24",
          border: "#2a2d3d",
          gold: "#D4AF37",
          "gold-light": "#F5E6A3",
          "gold-muted": "#9A824A",
          crimson: "#8A1828",
          "crimson-deep": "#4A0E18",
          ivory: "#FAF7F2",
          sand: "#E5DEC9",
          emerald: "#0E382B",
          peacock: "#0B2D39",
          plum: "#42162E",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        "zari-glow": "0 0 30px rgba(212, 175, 55, 0.3)",
        "wine-glow": "0 10px 40px rgba(43, 7, 14, 0.45)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
