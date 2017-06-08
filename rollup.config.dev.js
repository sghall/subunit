import serve from 'rollup-plugin-serve';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.js',
  dest: 'dist/subunit.js',
  moduleName: 'subunit',
  format: 'umd',
  globals: {
    three: 'THREE'
  },
  sourceMap: true,
  external: ['three'],
  plugins: [
    serve({
      open: true,
      verbose: true, 
      contentBase: '',
      host: 'localhost',
      port: 8000
    }),
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