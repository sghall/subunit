import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';

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
      port: 10001
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