import { Object3D } from 'three';
import Selection from './Selection';

export default function select(item) {
  var node = typeof item === 'function' ? item() : item;
  var root = new Selection([[new Object3D()]], [node]);
  root._groups[0][0].__data__ = {};
  root._groups[0][0].__tags__ = [];
  node.add(root._groups[0][0]);
  return root;
}

export function object(item) {
  var root = new Selection([[item]], [item.parent]);
  return root;
}
