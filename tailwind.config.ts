import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      body: ['Iner', "'M PLUS 1p\'", 'system-ui', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      white: '#fff',
      'grey-text': '#706d65',
      'grey-border': '#d6d3d0',
      'grey-bg': '#edebe8',
      'grey-disabled': '#c1bdb7',
      black: '#222',
      blue: '#2286FF',
      'blue-light': '#64aaff',
    },
  },
  plugins: [],
}

export default config
