import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/store/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        cream: '#F5F2EB',
        white: '#FFF',
        blue: '#112187',
        cblack: '#222222',
        gray: '#888',
        cgreen: '#16322c',
        cdark: '#384f4b',
        cgray: '#B7BDB8',
        cvrde: '#525C3C',
      },
      borderColor: {
        'custom-blue': '#a3cdec',
      },
    },
  },
  plugins: [],
}
export default config
