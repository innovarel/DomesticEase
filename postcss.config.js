// Please do not use the array form (like ['tailwindcss', 'postcss-preset-env'])
// it will create an unexpected error: Invalid PostCSS Plugin found: [0]

module.exports = {
  plugins: {
    "tailwindcss/nesting": {}, // Had to add this because we are using getStream UI components that use plain css, we can safely remove this line when we replace their components with our own
    tailwindcss: {},
    autoprefixer: {},
  },
};
