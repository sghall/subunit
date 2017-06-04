import THREE from 'THREE';
import { Selection } from './Selection';

export var SubUnit = {};

export var select = function (item) {
  var node = typeof item === "function" ? item() : item;
  var root = Selection.from([[new THREE.Object3D()]]);
  root.parentNode = node;
  root[0][0].__data__ = {};
  root[0][0].__tags__ = [];
  node.add(root[0][0]);
  return root;
};

export var selectObject = function (item) {
  return Selection.from([[item]]);
};

SubUnit.select = select;
SubUnit.object = selectObject;
