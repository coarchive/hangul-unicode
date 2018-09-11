module.exports = {
  verbose: true,
  testMatch: [
    '**/__tests__/**/*.?(m)js',
    '**/?(*.)(test|t).?(m)js',
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'node',
    'mjs',
  ],
  transform: {
    '^.+\\.m?js$': 'babel-jest',
  },
};
