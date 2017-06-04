(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.SubUnit = global.SubUnit || {})));
}(this, (function (exports) { 'use strict';

var empty = function() {
  return !this.node();
};

var node = function() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
};

var call = function() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
};

function use(model, callback) {
  return selectionUse(this, function(node, i, j) {
    callback.call(model, node.__data__, i, j);
  });
}

function selectionUse(groups, callback) {
  for (let j = 0, m = groups.length; j < m; j++) {
    for (let group = groups[j], i = 0, n = group.length, node; i < n; i++) {
      if ((node = group[i])) {
        callback(node, i, j);
      }
    }
  }
  return groups;
}

class BaseArray extends Array {
  constructor(input) {
    super(input);
  }
}

BaseArray.prototype.empty = empty;
BaseArray.prototype.node = node;
BaseArray.prototype.call = call;
BaseArray.prototype.use = use;

exports.BaseArray = BaseArray;

Object.defineProperty(exports, '__esModule', { value: true });

})));
