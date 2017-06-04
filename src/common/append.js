import THREE from 'three';

// export default function append(name) {
//   name = selectionCreator(name);

//   return this.select(function selectionAppend(...args) {
//     return name.call(this, ...args);
//   });
// }


export default function append(name) {
  const create = typeof name === 'function' ? name : selectionCreator(name);
  return this.select(function() {
    const child = create.apply(this, arguments);
    this.add(child);

    return child;
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
    return node;
  };
}
