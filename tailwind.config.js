module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
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
  plugins: []
};
