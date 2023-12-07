import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        main: '#262626',
        secondary: '#202020',
        tertiary: '#171717',
        active: '#6B27D8',
        inactive: '#64748b',
        mainel: '#f1f5f9'
      },
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
