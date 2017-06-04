// import { rollup } from 'rollup';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.js',
  dest: 'dist/subunit.js',
  moduleName: 'SubUnit',
  format: 'iife',
  plugins: [
    resolve({
      module: true,
      jsnext: true,
      browser: true,
      extensions: [ '.js', '.json' ],
      preferBuiltins: false,
      modulesOnly: true
    })
  ]
};