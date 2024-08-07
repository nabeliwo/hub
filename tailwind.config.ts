import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      body: ['Inter', "'M PLUS 1p'", 'system-ui', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      white: '#fff',
      'grey-text': '#706d65',
      'grey-border': '#d6d3d0',
      'grey-bg': '#edebe8',
      'grey-disabled': '#c1bdb7',
      'grey-bestbuy': '#f2f5f7',
      black: '#222',
      blue: '#2286FF',
      'blue-light': '#64aaff',
    },
    extend: {
      width: {
        'best-buy-half': 'calc(50% - 0.5rem)',
      },
      maxHeight: {
        'best-buy-max': 'calc(100% - 2rem)',
      },
    },
  },
  plugins: [],
}

export default config
