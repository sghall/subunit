module.exports = function(config){
  config.set({

    basePath : '../',

    files : [],

    systemjs: {
      files: [
        'src/**/*.js',
        'test/unit/**/*.js'
      ],

      configFile: 'test/system.config.js',

      // config: {
      //   paths: {
      //     'THREE': 'node_'
      //   }
      // },

      testFileSuffix: 'Spec.js'
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