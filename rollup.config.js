import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;
export default {
  input: 'src/main.js',
  moduleName: 'Hangul',
  output: {
    file: 'Hangul.js',
    format: 'iife',
    name: 'Hangul',
    strict: true,
    sourcemap: false,
  },
  watch: {
    include: 'src/**',
  },
  plugins: [
    resolve(),
    production && terser(),
  ],
};
