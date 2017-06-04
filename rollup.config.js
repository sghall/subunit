import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.js',
  dest: 'dist/subunit.js',
  moduleName: 'SubUnit',
  format: 'iife',
  globals: {
    three: 'THREE'
  },
  sourceMap: true,
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