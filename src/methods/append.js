export function append(name) {
  name = _selection_creator(name);

  return this.select(function () {
    return name.apply(this, arguments);
  });
}

function _selection_creator(name) {
  var func;

  if (typeof name === "function") {
    func = name; // SEND ANY CONSTRUCTOR
  } else if (name === "mesh") {
    func = THREE.Mesh;
  } else if (name === "line") {
    func = THREE.Line;
  } else if (name === "object") {
    func = THREE.Object3D;
  } else if (name === "g") {
    func = THREE.Object3D;
  } else {
    throw new Error("Cannot append: ", name);
  }

  return function (data) {
    var node = new func();
    node.__data__  = data;
    node.__tags__  = [];
    node.parentNode = this;
    this.children.push(node);
    return node;
  };
}