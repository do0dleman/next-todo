import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      backgroundImage: {
        'active-gradient': "linear-gradient(to bottom right, #5b21b6, #312e81)",
      }
    },
  },
  plugins: [
    require('tailwind-children')
  ],
} satisfies Config;
