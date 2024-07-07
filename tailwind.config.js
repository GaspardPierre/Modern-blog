/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: '#6200ea',
          secondary: '#00c853',
          'gray-light': '#f4f4f4',
          'gray-dark': '#333',
        },
        fontFamily: {
          sans: ['Arial', 'sans-serif'],
        },
        typography: (theme) => ({
          DEFAULT: {
            css: {
              color: theme('colors.gray-dark'),
              a: {
                color: theme('colors.primary'),
                '&:hover': {
                  color: theme('colors.secondary'),
                },
              },
            },
          },
        }),
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
    ],
  }