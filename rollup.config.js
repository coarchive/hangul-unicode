import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;
const base = {
  input: 'src/main.js',
  moduleName: 'Hangul',
  output: {
    format: 'umd',
    name: 'Hangul',
    strict: true,
  },
  plugins: [
    resolve(),
  ],
};
let options;
if (production) {
  base.output.file = 'dist/Hangul.js';
  options = [
    base,
    {
      input: 'src/main.js',
      moduleName: 'Hangul',
      output: {
        file: 'dist/Hangul.min.js',
        format: 'umd',
        name: 'Hangul',
        strict: true,
      },
      plugins: [
        resolve(),
        terser(),
      ],
    },
  ];
} else {
  options = base;
  options.output.file = 'dev/bundle.js';
  options.output.sourcemap = true;
  options.watch = {
    include: 'src/**',
  };
  options.plugins.push(serve({
    contentBase: 'dev',
    port: 8080,
  }));
}
export default (options);
