/* eslint-disable */

module.exports = function(config){
  config.set({
    basePath : '../',
    systemjs: {
      files: [
        'src/**/*.js',
        'test/unit/**/*.js'
      ],
      configFile: 'test/system.config.js',
      config: {
        map: {
          'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
          'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
          d3: './node_modules/d3/build/d3.js',
          three: './node_modules/three/build/three.js',
          subunit: '../dist/subunit.js'
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
