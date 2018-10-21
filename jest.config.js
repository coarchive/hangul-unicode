module.exports = {
  verbose: true,
  testMatch: [
    // '**/__tests__/**/*.?(m)js',
    '**/?(*.)(test|t).?(m)js',
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'mjs',
  ],
  transform: {
    '^.+\\.m?js$': 'babel-jest',
  },
};
// sometimes jest just won't work
// it's not my fault probably
// just keep running it until it works
// you don't need to change any files
// somehow my testing setup seems to be
// non-deterministic
