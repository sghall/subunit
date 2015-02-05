import { extend_selection } from "./core/extend_selection";
import { Dispatcher } from './core/Dispatcher';
import { EventEmitter } from './core/EventEmitter';
import { assign } from './core/utils';

var SubUnit = {};

if ( typeof module === 'object' ) {
  module.exports = SubUnit;
}

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

  store.addChangeListener = function(callback) {
    this.on('change', callback);
  };

  store.removeChangeListener = function(callback) {
    this.removeListener('change', callback);
  };

  return store;
};

this.SubUnit = SubUnit;