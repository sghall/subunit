import THREE from 'three';

export default function append(name) {
  name = selectionCreator(name);

  return this.select(function selactionAppend(...args) {
    return name.cal(this, ...args);
  });
}

function selectionCreator(name) {
  let Func;

  if (typeof name === 'function') {
    Func = name; // SEND ANY CONSTRUCTOR
  } else if (name === 'mesh') {
    Func = THREE.Mesh;
  } else if (name === 'line') {
    Func = THREE.Line;
  } else if (name === 'object' || name === 'g') {
    Func = THREE.Object3D;
  } else {
    throw new Error(`Cannot append: ${name}`);
  }

  return function createSelection(data) {
    const node = new Func();
    node.__data__ = data;
    node.__tags__ = [];
    node.parentNode = this;
    this.add(node);
    return node;
  };
}
