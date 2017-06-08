import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.js',
  dest: 'dist/subunit.js',
  moduleName: 'subunit',
  format: 'umd',
  globals: {
    three: 'THREE'
  },
  sourceMap: false,
  external: ['three'],
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