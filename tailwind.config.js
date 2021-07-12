module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        main: '#F7797D',
        'main-yellow': '#FBD786',
        'main-green': '#C6FFDD'
      },
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        button: 'var(--color-bg-button)'
      },
      textColor: {
        accent: 'var(--color-text-accent)',
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        button: 'var(--color-bg-button)'
      }
    }
  },
  variants: {
    extend: {
      display: [
        'responsive',
        'group-hover',
        'group-focus',
        'group-active',
        'focus',
        'group-focus-visible'
      ]
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/line-clamp')

    // ...
  ]
};
