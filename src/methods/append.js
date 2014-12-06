export function append (name) {
  name = _selection_creator(name);

  return this.select(function() {
    return name.apply(this, arguments);
  });
}

function _selection_creator(name) {
  if (typeof name === "function") {
    return name;
  } else if (name === "scene") {
    return function () { console.log("scene"); };
  } else if (name === "camera") {
    return function () { console.log("camera"); };
  } else if (name === "mesh") {
    return function (data) { 
      var node = new THREE.Mesh();
      node.__data__ = data;
      node.__class__ = [];
      node.parentNode = this;
      this.add(node);
      return node;
    };
  } else {
    return function (data) { 
      var node = new THREE.Object3D();
      node.__data__ = data;
      node.__class__ = [];
      node.parentNode = this;
      this.add(node);
      return node;
    };
  }
}