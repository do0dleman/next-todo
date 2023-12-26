import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '0' },
          '50%, 100%': { opacity: '1' },
        }
      },
      animation: {
        blink: 'blink 1.2s linear infinite'
      },
      colors: {
        front: '#282828',
        main: '#262626',
        secondary: '#202020',
        tertiary: '#171717',
        active: '#7d2dfe',
        inactive: '#64748b',
        mainel: '#f1f5f9',
        error: '#CB1515',
        deepBlue: '#040126'
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
