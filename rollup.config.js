export default {
  input: 'src/main.js',
  moduleName: 'Hangul',
  output: {
    file: 'Hangul.js',
    format: 'iife',
    name: 'Hangul',
    strict: true,
    sourcemap: true,
  },
  watch: {
    include: 'src/**',
  },
};
