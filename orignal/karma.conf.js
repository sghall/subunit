function karmaConfig(config){
  config.set({
    basePath: '../',
    files: [],
    systemjs: {
      files: [
        'src/**/*.js',
        'test/**/*.js'
      ],
      configFile: 'test/system.config.js',
      config: {
        paths: {
          'es6-module-loader': 'node_modules/es6-module-loader/dist/es6-module-loader.js',
          'babel': 'node_modules/babel-core/browser.js'
        },
        transpiler: 'babel'
      },
      testFileSuffix: 'Spec.js'
    },
    autoWatch: true,
    frameworks: ['systemjs', 'jasmine'],
    browsers: ['Chrome'],
    plugins: [
      'karma-systemjs',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ],
    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
}

module.exports = karmaConfig;