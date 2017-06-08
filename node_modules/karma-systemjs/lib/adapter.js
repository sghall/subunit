(function(window) {
  'use strict';
  var adapter = {
    /**
     * Takes a file path and the baseURL and returns the module name
     * to pass to System.import()
     * @param filePath {string}
     * @param baseURL {string}
     * @param System {object}
     * @returns {string}
     */
    getModuleNameFromPath: function(filePath, baseURL, System) {
      // Convert file paths to module name by stripping the baseURL and the ".js" extension
      if (System.defaultJSExtensions) {
        filePath = filePath.replace(/\.js$/, '');
      }
      return filePath
        .replace(new RegExp('^' + baseURL.replace('/', '\/')), '');
    },

    /**
     * Returns the modules names for files that match a given import RegExp.
     * @param filePaths {object}
     * @param importRegexp {object}
     * @param System {object}
     * @returns {string[]}
     */
    getMatchingModulesToImport: function(filePaths, importRegexp, System) {
      var moduleNames = [];
      for (var filePath in filePaths) {
        if (filePaths.hasOwnProperty(filePath) && importRegexp.test(filePath)) {
          moduleNames.push(adapter.getModuleNameFromPath(filePath, System.baseURL, System));
        }
      }
      return moduleNames;
    },

    /**
     * Handles calling System.import() for files where each import is made in parallel, returning a single promise
     * that resolves once all imports have completed.
     * @param System {object}
     * @param Promise {object}
     * @param files {object}
     * @param importRegexps {object[]}
     * @returns {promise}
     */
    parallelImportFiles: function(System, Promise, files, importRegexps) {
      // Run all imports in parallel
      var importPromises = [];
      for (var x = 0; x < importRegexps.length; x++) {
        var moduleNames = adapter.getMatchingModulesToImport(files, importRegexps[x], System);
        for (var i = 0; i < moduleNames.length; i++) {
          importPromises.push(System.import(moduleNames[i]));
        }
      }
      return Promise.all(importPromises);
    },

    /**
     * Chains a System.import() call onto an existing promise, returning the new promise.
     * @param promise {promise}
     * @param moduleName {string}
     * @param System {object}
     * @returns {promise}
     */
    chainImport: function(promise, moduleName, System) {
      return promise.then(function() {
        return System.import(moduleName);
      });
    },

    /**
     * Handles calling System.import() for files where each import promise is chained into the next import promise,
     * returning a promise that resolves once the last import has completed.
     * @param System {object}
     * @param Promise {object}
     * @param files {object}
     * @param importRegexps {object[]}
     * @returns {promise}
     */
    sequentialImportFiles: function(System, Promise, files, importRegexps) {
      // Chain import promises to maintain sequence
      var promise = Promise.resolve();
      for (var x = 0; x < importRegexps.length; x++) {
        var moduleNames = adapter.getMatchingModulesToImport(files, importRegexps[x], System);
        for (var i = 0; i < moduleNames.length; i++) {
          promise = adapter.chainImport(promise, moduleNames[i], System);
        }
      }
      return promise;
    },

    /**
     * Calls System.import on all the files that match one of the importPatterns.
     * Returns a single promise which resolves once all imports are complete.
     * @param System {object}
     * @param Promise {object}
     * @param files {object} key/value map of filePaths to change counters
     * @param importRegexps {RegExp[]}
     * @param [strictImportSequence=false] {boolean} If true, System.import calls are chained to preserve sequence.
     * @returns {promise}
     */
    importFiles: function(System, Promise, files, importRegexps, strictImportSequence) {
      if (strictImportSequence) {
        return adapter.sequentialImportFiles(System, Promise, files, importRegexps)
      } else {
        return adapter.parallelImportFiles(System, Promise, files, importRegexps)
      }
    },

    /**
     * Changes the 'baseURL' to include the '/base/' path that karma
     * serves files from.
     * @param originalBaseURL {string}
     * @returns {string}
     */
    updateBaseURL: function(originalBaseURL) {
      if (!originalBaseURL) {
        return '/base/';
      } else if (originalBaseURL.indexOf('./') === 0) {
        return originalBaseURL.replace('./', '/base/');
      } else if (originalBaseURL.indexOf('/') !== 0) {
        return '/base/' + originalBaseURL;
      } else {
        return '/base' + originalBaseURL;
      }
    },

    /**
     * Has SystemJS load each test suite, then starts Karma
     * @param karma {object}
     * @param System {object}
     * @param Promise {object}
     */
    run: function(karma, System, Promise) {
      // Fail fast if any of the dependencies are undefined
      if (!karma) {
        (console.error || console.log)('Error: Not setup properly.  window.__karma__ is undefined');
        return;
      }
      if (!System) {
        (console.error || console.log)('Error: Not setup properly.  window.System is undefined');
        return;
      }
      if (!Promise) {
        (console.error || console.log)('Error: Not setup properly.  window.Promise is undefined');
        return;
      }

      // Stop karma from starting automatically on load
      karma.loaded = function() {

        // Load SystemJS configuration from karma config
        // And update baseURL with '/base', where Karma serves files from
        if (karma.config.systemjs.config) {
          // SystemJS config is converted to a JSON string by the framework
          // https://github.com/rolaveric/karma-systemjs/issues/44
          karma.config.systemjs.config = JSON.parse(karma.config.systemjs.config);

          karma.config.systemjs.config.baseURL = adapter.updateBaseURL(karma.config.systemjs.config.baseURL);
          System.config(karma.config.systemjs.config);

          // Exclude bundle configurations if useBundles option is not specified
          if (!karma.config.systemjs.useBundles) {
            System.bundles = [];
          }

        } else {
          System.config({baseURL: '/base/'});
        }

        // Convert the 'importPatterns' into 'importRegexps'
        var importPatterns = karma.config.systemjs.importPatterns;
        var importRegexps = [];
        for (var x = 0; x < importPatterns.length; x++) {
          importRegexps.push(new RegExp(importPatterns[x]));
        }

        // Import each test suite using SystemJS
        var testSuitePromise;
        try {
          testSuitePromise = adapter.importFiles(System, Promise, karma.files, importRegexps, karma.config.systemjs.strictImportSequence);
        } catch (e) {
          karma.error(adapter.decorateErrorWithHints(e, System));
          return;
        }

        // Once all imports are complete...
        testSuitePromise.then(function () {
          karma.start();
        }, function (e) {
          karma.error(adapter.decorateErrorWithHints(e, System));
        });
      };
    },

    /**
     * Checks errors to see if they match known issues, and tries to decorate them
     * with hints on how to resolve them.
     * @param err {string}
     * @param System {object}
     * @returns {string}
     */
    decorateErrorWithHints: function(err, System) {
      err = String(err);
      // Look for common issues in the error message, and try to add hints to them
      switch (true) {
        // Some people use ".es6" instead of ".js" for ES6 code
      case /^Error loading ".*\.es6" at .*\.es6\.js/.test(err):
        return err + '\nHint: If you use ".es6" as an extension, ' +
          'add this to your SystemJS paths config: {"*.es6": "*.es6"}';
      case /^TypeError: Illegal module name "\/base\//.test(err):
        return err + '\nHint: Is the working directory different when you run karma?' +
          '\nYou may need to change the baseURL of your SystemJS config inside your karma config.' +
          '\nIt\'s currently checking "' + System.baseURL + '"' +
          '\nNote: "/base/" is where karma serves files from.';
      }

      return err;
    }
  };

  if (window.System) {
    adapter.run(window.__karma__, window.System, window.Promise);
  } else {
    //if no System global, expose global for unit testing
    window.karmaSystemjsAdapter = adapter;
  }
})(window);