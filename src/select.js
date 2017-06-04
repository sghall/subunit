import { Object3D } from 'three';
import Selection from './Selection';

export default function select(item) {
  const node = typeof item === 'function' ? item() : item;
  const root = new Selection([[new Object3D()]], [node]);
  root._groups[0][0].__data__ = {};
  root._groups[0][0].__tags__ = [];
  node.add(root._groups[0][0]);
  return root;
}
