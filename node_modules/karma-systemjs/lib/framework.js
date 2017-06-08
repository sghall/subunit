'use strict';
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var Minimatch = require('minimatch').Minimatch;

/**
 * Helper for mapping include file paths to karma file patterns - served, included, but not watched
 * @param path {string}
 * @returns {object}
 */
var createIncludePattern = function(path) {
  return {
    pattern: path,
    included: true,
    served: true,
    watched: false
  };
};

/**
 * Resolve paths for dependencies now
 * @param moduleName {string}
 * @param relativePath {string}
 * @returns {string}
 */
var getDependencyPath = function(moduleName, relativePath) {
  try {
    return path.join(path.dirname(require.resolve(moduleName)), relativePath);
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND' && e.message.indexOf(moduleName) !== -1) {
      console.warn('Cannot find "%s".\n  Did you forget to install it ?\n' +
        '  npm install %s --save-dev', moduleName, moduleName);
    } else {
      console.warn('Error during loading "%s":\n  %s', moduleName, e.message);
    }
  }
};

/**
 * Loads up a SystemJS config file and returns the configuration
 * Taken from how systemjs-builder loads config files inside node
 * @param filePath {string}
 * @returns {object}
 */
var readConfigFile = function(filePath) {
  var curSystem = global.System;
  var fileConfig = {};
  global.System = {
    config: function(cfg) {
      _.merge(fileConfig, cfg);
    }
  };
  // jshint evil:true
  new Function(fs.readFileSync(filePath).toString()).call(global);
  global.System = curSystem;
  return fileConfig;
};

/**
 * Returns a dependency path based on 'paths' configuration, or node_modules/ lookup
 * @param systemjsConfig {object} The SystemJS config object
 * @param basePath {string} Path that SystemJS paths are relative to
 * @param systemModuleName {string} Name of the module as the SystemJS config knows it.
 * @param npmModuleName {string} Name of module as npm knows it.
 * @param npmPath {string} Path to use relative to a `require.resolve()` call
 * @returns {string}
 */
var pathOrNpm = function(systemjsConfig, basePath, systemModuleName, npmModuleName, npmPath) {
  var filePath = getModulePath(systemjsConfig, basePath, systemModuleName);
  if (filePath) {
    return filePath;
  } else {
    console.warn('[WARNING] Looking up paths with require.resolve() is deprecated.\n' +
      'Please add "' + systemModuleName + '" to your SystemJS config paths.');
    return getDependencyPath(npmModuleName, npmPath);
  }
};

/**
 * Returns a dependency path based on 'paths' or 'map' configuration
 * @param systemjsConfig {object} The SystemJS config object
 * @param basePath {string} Path that SystemJS paths are relative to
 * @param systemModuleName {string} Name of the module as the SystemJS config knows it.
 * @returns {string|undefined}
 */
var getModulePath = function(systemjsConfig, basePath, systemModuleName) {
  var filePath = (systemjsConfig.paths && systemjsConfig.paths[systemModuleName]) || (systemjsConfig.map && systemjsConfig.map[systemModuleName]);
  if (filePath) {
    return path.join(basePath, systemjsConfig.baseURL || '', filePath);
  }
};

/**
 * Returns the path to the transpiler.
 * @param config {object} SystemJS config
 * @param basePath {string}
 * @returns {string}
 */
var getTranspilerPath = function(config, basePath) {
  // Path should come from SystemJS, but for backwards compatibility will also check for a known npm path
  switch (config.transpiler) {
  case 'none':
  case false:
  case null: // If 'none', false, or null, no transpiler in use
    return '';
  case 'babel':
    return pathOrNpm(config, basePath, 'babel', 'babel-core', '/lib/api/browser.js');
  case undefined: // Traceur is still the default transpiler if undefined
  case 'traceur':
    return pathOrNpm(config, basePath, 'traceur', 'traceur', '/../../bin/traceur.js');
  case 'typescript':
    return pathOrNpm(config, basePath, 'typescript', 'typescript', '/typescript.js');
  default:
    return pathOrNpm(config, basePath, config.transpiler, config.transpiler, config.transpiler + '.js');
  }
};

/**
 * Returns the list of '{included: true}' file patterns before setting them to '{included: false}'
 * @param fileList {object[]}
 * @param basePath {string}
 * @returns {string[]}
 */
var processIncludedPatterns = function(fileList, basePath) {
  var included = _.filter(fileList, {included: true});
  _.forEach(included, function (file) {
    file.included = false;
  });
  return _.map(included, function(file) {
    // Rather than make Minimatch available in the browser,
    // it's simpler to use it within Karma and extract the RegExps as strings.
    // Also take into account the '/base' or '/absolute' path that Karma serves files from
    var path = !basePath || file.pattern.indexOf(basePath) === 0 ?
        '/base' + file.pattern.replace(basePath, '') :
        '/absolute' + file.pattern;
    var regexString = (new Minimatch(path)).makeRe().toString();
    return regexString.substring(1, regexString.length - 1); // Remove the "/" from the start and end, so it'll fit into 'new RegExp()'
  });
};

/**
 * Run during karma initialisation.
 * Alters the karma configuration to use SystemJS.
 * @param config {object}
 */
var initSystemjs = function(config) {
  // Final files array should look like this:
  // - SystemJS libraries - included
  // - SystemJS config - included & watched
  // - 'files' - served, watched, and marked to be called with 'System.import()' (if {included: true})
  // - 'systemjs.serveFiles' - served only
  // - Plugin adapter - included

  // Create list of file patterns to load with 'System.import()'
  var importPatterns = processIncludedPatterns(config.files, config.basePath);

  var kSystemjsConfig = config.systemjs || {};
  kSystemjsConfig.config = kSystemjsConfig.config || {};
  var basePath = (config.basePath || '.') + '/';

  // If there's an external SystemJS configuration file...
  if (kSystemjsConfig.configFile) {
    // Load it, and merge it with the config
    // karma-systemjs.config should take precedence over external SystemJS configuration file
    var cfgPath = basePath + kSystemjsConfig.configFile;
    var kConfig = readConfigFile(cfgPath);

    // Absolute paths for modules should be moved to /base, where Karma serves them
    ['map', 'paths'].forEach(function(cfgKey) {
      if (typeof kConfig[cfgKey] === 'object') {
        Object.keys(kConfig[cfgKey]).forEach(function(module) {
          if (kConfig[cfgKey][module][0] === '/') {
            kConfig[cfgKey][module] = '/base' + kConfig[cfgKey][module];
          }
        });
      }
    });

    // Merge the SystemJS config file with the SystemJS config in the karma config
    _.merge(kConfig, kSystemjsConfig.config, function(objectValue, sourceValue) {
      // Overwrite array values - don't merge them
      if (_.isArray(sourceValue)) {
        return sourceValue;
      }
    });

    kSystemjsConfig.config = kConfig;
  }

  // Resolve the paths for systemjs and it's dependencies, then adds to start of config.files.
  // Ignores dependencies if not found in SystemJS config
  var systemjsPath = pathOrNpm(kSystemjsConfig.config, basePath,
    'systemjs', 'systemjs', '/dist/system.src.js');
  config.files.unshift(createIncludePattern(systemjsPath));
  var polyfillsPath = getModulePath(kSystemjsConfig.config, basePath, 'system-polyfills');
  if (polyfillsPath) {
    config.files.unshift(createIncludePattern(polyfillsPath));
  }
  var es6LoaderPath = getModulePath(kSystemjsConfig.config, basePath, 'es6-module-loader');
  if (es6LoaderPath) {
    config.files.unshift(createIncludePattern(es6LoaderPath));
  }

  // If a transpiler is being used, serve it
  var transpilerPath = getTranspilerPath(kSystemjsConfig.config, basePath);
  if (transpilerPath) {
    // Don't watch, since this file should never change
    // Don't include, as SystemJS will need to load it
    config.files.unshift({
      pattern: transpilerPath,
      included: false,
      served: true,
      watched: false
    });
  }

  // system.js-0.16+ uses Function.prototype.bind, which PhantomJS does not support.
  if (config.browsers && config.browsers.indexOf('PhantomJS') !== -1) {
    var phantomjsPolyfillPath = getModulePath(kSystemjsConfig.config, basePath, 'phantomjs-polyfill');
    if (phantomjsPolyfillPath) {
      config.files.unshift(
        createIncludePattern(phantomjsPolyfillPath)
      );
    }
  }

  // Adds file patterns from config.systemjs.serveFiles to config.files, set to be served but not included
  if (kSystemjsConfig.serveFiles) {
    kSystemjsConfig.serveFiles.forEach(function(pathOrPattern) {
      if (typeof pathOrPattern === 'object') {
        config.files.push(pathOrPattern);
      } else {
        config.files.push({
          pattern: basePath + pathOrPattern,
          included: false,
          served: true,
          watched: true
        });
      }
    });
  }

  // Add file patterns to always be included back into files
  if (kSystemjsConfig.includeFiles) {
    var filesToInclude = kSystemjsConfig.includeFiles.map(function(pathOrPattern) {
  	if (typeof pathOrPattern === 'object') {
           return pathOrPattern;
      	} else {
	   return createIncludePattern(basePath + pathOrPattern);
  	}
    });
    
    filesToInclude.reverse().forEach(function(file) {
        config.files.unshift(file);
    });
  }

  // Adds karma-systemjs adapter.js to end of config.files
  config.files.push(createIncludePattern(path.join(__dirname, 'adapter.js')));

  // Adding configuration to be passed to the adapter running on the browser
  config.client.systemjs = {
    // SystemJS config needs to be converted to JSON to guarantee arrays are encoded correctly
    // https://github.com/rolaveric/karma-systemjs/issues/44
    config: JSON.stringify(kSystemjsConfig.config),
    importPatterns: importPatterns,
    strictImportSequence: kSystemjsConfig.strictImportSequence
  };
};
initSystemjs.$inject = ['config'];

module.exports = initSystemjs;
