import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;
const options = {
  input: 'src/main.js',
  moduleName: 'Hangul',
  output: {
    file: 'dev/bundle.js',
    format: 'umd',
    name: 'Hangul',
    strict: true,
    sourcemap: true,
  },
  plugins: [
    resolve(),
  ],
};
if (production) {
  options.output.file = 'dist/bundle.js';
  options.plugins.push(terser());
} else {
  options.output.file = 'dev/bundle.js';
  options.watch = {
    include: 'src/**',
  };
  options.plugins.push(serve({
    contentBase: 'dev',
    port: 8080,
  }));
}
export default (options);
