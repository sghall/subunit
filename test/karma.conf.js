module.exports = function(config){
  config.set({

    basePath : '../',

    files : [],

    systemjs: {
      files: [
        'app/bower_components/jquery/dist/jquery.js',
        'app/bower_components/angular/angular.js',
        'app/bower_components/angular-route/angular-route.js',
        'app/bower_components/angular-resource/angular-resource.js',
        'app/bower_components/angular-animate/angular-animate.js',
        'app/bower_components/angular-mocks/angular-mocks.js',
        'app/lib/*.js',
        'app/js/**/*.js',
        'app/partials/**/*.html',
        'test/unit/**/*.js'
      ],

      configFile: 'app/system.config.js',

      config: {
        paths: {
          'angular-mocks': 'app/bower_components/angular-mocks/angular-mocks.js'
        }
      },

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