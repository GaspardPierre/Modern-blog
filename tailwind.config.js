/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          'primary': '#1a5f7a',
          'secondary': '#159895',
          'accent': '#57c5b6',
          'background': '#e2f6ff',
          'text': '#002B5B',
        },
        gradientColorStops: {
          'gradient-1': '#1a5f7a',
          'gradient-2': '#159895',
          'gradient-3': '#57c5b6',
        },
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
    ],
  }