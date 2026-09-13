import type { Config } from "tailwindcss";

const preset = {
  theme: {
    extend: {
      borderRadius: {
        card: "0.5rem",
      },
      colors: {
        brand: {
          DEFAULT: "oklch(0.62 0.18 255)",
          foreground: "oklch(0.98 0.01 255)",
        },
      },
    },
  },
} satisfies Config;

export default preset;
