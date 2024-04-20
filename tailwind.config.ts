import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      body: ['Iner', 'M PLUS 1p', 'system-ui', 'sans-serif'],
    },
    colors: {
      transparent: "transparent",
      white: '#fff',
      grey: "#f2f5f7",
      black: '#222',
      blue: '#2286FF',
      'blue-light': '#64aaff',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
  },
  plugins: [],
}

export default config
