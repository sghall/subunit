import { extend_selection } from "./core/extend_selection";
import { Dispatcher } from './core/Dispatcher';
import { EventEmitter } from './core/EventEmitter';
import { assign } from './core/utils';
import { LRUCache } from './core/LRUCache';
import THREE from 'THREE';

export var SubUnit = {};

SubUnit.select = function (object) {
  var node = typeof object === "function" ? object(): object;
  var root = extend_selection([[new THREE.Object3D()]]);
  root.parentNode = node;
  root[0][0].__data__ = {};
  root[0][0].__tags__ = [];
  node.add(root[0][0]);
  return root;
};

SubUnit.object = function (object) {
  return extend_selection([[object]]);
};

SubUnit.createDispatcher = function () {

  var dispatcher = new Dispatcher();

  dispatcher.serverAction = function (action) {
    var payload = {
      source: 'SERVER_ACTION',
      action: action
    };
    this.dispatch(payload);
  };

  dispatcher.viewAction = function (action) {
    var payload = {
      source: 'VIEW_ACTION',
      action: action
    };
    this.dispatch(payload);
  };

  return dispatcher;
};

SubUnit.createStore = function (methods) {
  var store = assign({}, EventEmitter.prototype, methods);

  store.emitChange = function() {
    this.emit('change');
  };

  store.addChangeListener = function (callback) {
    this.on('change', callback);
  };

  store.removeChangeListener = function(callback) {
    this.removeListener('change', callback);
  };

  return store;
};

function SubUnitView (parent) {
  this.state = {};

  var node = new THREE.Object3D();
  this.parentNode = parent;
  this.parentNode.add(node);

  this.root = SubUnit.object(node);
  this.events = {};
}

SubUnitView.prototype.render = function () {};

SubUnitView.prototype.setState = function (data) {
  this.state = data;

  var render = this.render.bind(this);
  setTimeout(render, 0);
};

SubUnitView.prototype.remove = function () {
  if (this.viewWillUnmount && typeof this.viewWillUnmount === 'function') {
    this.viewWillUnmount();
  }
  this.parentNode.remove(this.root.node());
};

SubUnit.createView = function (parent, methods) {

  var view = assign(new SubUnitView(parent), methods);

  if (view.getInitialState || typeof view.getInitialState === 'function') {
    view.setState(view.getInitialState());
  }

  if (view.viewDidMount && typeof view.viewDidMount === 'function') {
    view.viewDidMount();
  }

  if (!view.render || typeof view.render !== 'function') {
    console.warn('SubUnit view must have a render method');
  } else {
    view.render();
  }

  return view;
};

// adapted from memoize.js by @philogb and @addyosmani
SubUnit.cache = function (max, fn) {
  if (!fn) {
    throw new Error("SubUnit.cache: max and function are required (max, fn)");
  }

  return function () {
    var args = Array.prototype.slice.call(arguments);

    var key = "", len = args.length, cur = null, entry;

    while (len--) {
      cur = args[len];
      key += (cur === Object(cur))? JSON.stringify(cur): cur;

      if (!fn.lrucache) {
        fn.lrucache = new LRUCache({max: max});
      }
    }

    if (entry = fn.lrucache.get(key)) {
      return entry;
    }

    entry = fn.apply(this, args);
    fn.lrucache.set(key, entry);

    return entry;
  };
};

SubUnit.lru = function (max) {
  max = max || 0;

  return new LRUCache({max: max});
};

// adapted from memoize.js by @philogb and @addyosmani
SubUnit.memoize = function (fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments);

    var key = "", len = args.length, cur = null;

    while (len--) {
      cur = args[len];
      key += (cur === Object(cur))? JSON.stringify(cur): cur;

      if (!fn.memoize) {
        fn.memoize = {};
      }
    }

    return (key in fn.memoize)? fn.memoize[key]:
    fn.memoize[key] = fn.apply(this, args);
  };
};

// if (typeof define === "function" && define.amd) {
//   define(this.SubUnit = SubUnit); 
// }
// else if (typeof module === "object" && module.exports) {
//   module.exports = SubUnit; 
// }
// else {
//  this.SubUnit = SubUnit;
// }