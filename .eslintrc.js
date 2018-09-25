module.exports = {
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  plugins: [
    'jest',
    'babel',
  ],
  rules: {
    'no-plusplus': 'off',
    'no-bitwise': 'off',
    'no-mixed-operators': 'off',
    camelcase: 'off',
  },
  env: {
    'jest/globals': true,
  },
};
