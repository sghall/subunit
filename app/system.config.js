// Configure module loader
System.config({
	baseURL: '/',

	// Set paths for third-party libraries as modules
	paths: {
		'jquery': 'app/bower_components/jquery/dist/jquery.js',
		'angular': 'app/bower_components/angular/angular.js',
		'angular-animate': 'app/bower_components/angular-animate/angular-animate.js',
		'angular-route': 'app/bower_components/angular-route/angular-route.js',
		'angular-resource': 'app/bower_components/angular-resource/angular-resource.js',
    'text': 'app/lib/text.js',
    'babel': 'node_modules/babel-core/browser.js'
  },

  meta: {
    'jquery': {format: 'global', exports: 'jQuery'},
    'angular': {format: 'global', exports: 'angular', deps: ['jquery']}
  },

  transpiler: 'babel'
});

