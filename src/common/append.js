import THREE from 'THREE';

export function append(name) {
  name = selectionCreator(name);

  return this.select(function () {
    return name.apply(this, arguments);
  });
}

function selectionCreator(name) {
  var Func;

  if (typeof name === "function") {
    Func = name; // SEND ANY CONSTRUCTOR
  } else if (name === "mesh") {
    Func = THREE.Mesh;
  } else if (name === "line") {
    Func = THREE.Line;
  } else if (name === "object") {
    Func = THREE.Object3D;
  } else if (name === "g") {
    Func = THREE.Object3D;
  } else {
    throw new Error("Cannot append: ", name);
  }

  return function (data) {
    var node = new Func();
    node.__data__  = data;
    node.__tags__  = [];
    node.parentNode = this;
    this.add(node);
    return node;
  };
}
