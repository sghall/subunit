import THREE from 'three';
import Selection from './Selection';

export default function select(item) {
  const node = typeof item === 'function' ? item() : item;
  const root = Selection.from([[new THREE.Object3D()]]);
  root.parentNode = node;
  root[0][0].__data__ = {};
  root[0][0].__tags__ = [];
  node.add(root[0][0]);
  return root;
}
