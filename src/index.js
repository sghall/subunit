import THREE from 'THREE';
import { Selection } from './core/Selection';

export var SubUnit = {};

SubUnit.select = function (object) {
  var node = typeof object === "function" ? object(): object;
  var root = Selection.from([[new THREE.Object3D()]]);
  root.parentNode = node;
  root[0][0].__data__ = {};
  root[0][0].__tags__ = [];
  node.add(root[0][0]);
  return root;
};

SubUnit.object = function (object) {
  return Selection.from([[object]]);
};
