import { extend_selection } from "./core/extend_selection";

var subunit = {};

if ( typeof module === 'object' ) {
  module.exports = subunit;
}

subunit.select = function (object) {
  var node = typeof object === "function" ? object(): object;
  var root = extend_selection([[new THREE.Object3D()]]);
  root.parentNode = node;
  root[0][0].__data__  = {};
  root[0][0].__class__ = [];
  node.add(root[0][0]);
  return root;
};

subunit.object = function (object) {
  return extend_selection([[object]]);
};

this.subunit = subunit;