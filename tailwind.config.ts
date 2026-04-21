import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#e8eaf1',
        slate: '#101218',
        card: '#171b24'
      }
    }
  },
  plugins: []
} satisfies Config;
