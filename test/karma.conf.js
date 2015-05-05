module.exports = function(config){
  config.set({
    basePath : '../',
    files : [
      'node_modules/babel-core/browser-polyfill.js',
      'node_modules/babel-core/browser.js',
      'node_modules/three/three.js',
      'node_modules/d3/d3.js'
    ],
    systemjs: {
      files: [
        'src/**/*.js',
        'test/unit/**/*.js'
      ],
      configFile: 'test/system.config.js',
      config: {
        map: {
          d3: 'node_modules/d3/d3',
          THREE: 'node_modules/three/three',
          babel: 'node_modules/babel-core/browser',
          SubUnit: 'src/index'
        }
      },
      testFileSuffix: '.spec.js'
    },
    autoWatch : true,
    frameworks: ['systemjs', 'jasmine'],
    browsers : ['Chrome'],
    plugins : [
      'karma-systemjs',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ],
    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};