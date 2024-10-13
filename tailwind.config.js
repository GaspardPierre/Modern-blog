/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-inter)', 'sans-serif'],
        title: ['var(--font-poppins)', 'sans-serif'],
      },
      colors: {
        'primary': {
          50: '#e6f3f7',
          100: '#cce7ef',
          200: '#99cfdf',
          300: '#66b7cf',
          400: '#339fbf',
          500: '#1a5f7a', // Base color
          600: '#154c62',
          700: '#10394a',
          800: '#0b2631',
          900: '#051319',
        },
        'secondary': {
          50: '#e6faf9',
          100: '#ccf5f3',
          200: '#99ebe7',
          300: '#66e1db',
          400: '#33d7cf',
          500: '#159895', // Base color
          600: '#117a77',
          700: '#0d5b59',
          800: '#083d3c',
          900: '#041e1e',
        },
        'accent': {
          50: '#eef8f6',
          100: '#dcf1ed',
          200: '#b9e3db',
          300: '#97d5c9',
          400: '#74c7b7',
          500: '#57c5b6', // Base color
          600: '#469e92',
          700: '#34766d',
          800: '#234f49',
          900: '#112724',
        },
        'background': '#e2f6ff',
        'text': '#002B5B',
      },
      gradientColorStops: {
        'gradient-1': '#1a5f7a',
        'gradient-2': '#159895',
        'gradient-3': '#57c5b6',
        'gradient-4': '#E0F8F3',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}