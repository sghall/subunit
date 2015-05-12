
export function attr(name, value) {

  if (arguments.length < 2) {
    for (value in name) {
      this.each(selectionAttr(value, name[value]));
    }
    return this;
  }
  return this.each(selectionAttr(name, value));
}

function selectionAttr(name, value) {

  function attrNull() {
    delete this[name];
  }

  function attrConstant() {
    if (name === "tags" || name === "class") {
      var arr = value.split(" ");
      for (var i = 0; i < arr.length; i++) {
        this.__tags__.push(arr[i]);
      }
    } else if (name === "position" || name === "scale") {
      this[name].copy(value);
    } else if (name === "rotation" ) {
      this.rotation.x = value.x || this.rotation.x;
      this.rotation.y = value.y || this.rotation.y;
      this.rotation.z = value.z || this.rotation.z;
    } else if (name === "lookAt") {
      this.lookAt(value);
    } else {
      this[name] = value;
    }
  }

  function attrFunction() {
    var res = value.apply(this, arguments);
    if (res === null) {
      return this[name] && delete this[name];
    } else if (name === "position" || name === "scale") {
      this[name].copy(res);
    } else if (name === "rotation" ) {
      this.rotation.x = res.x || this.rotation.x;
      this.rotation.y = res.y || this.rotation.y;
      this.rotation.z = res.z || this.rotation.z;
    } else if (name === "lookAt") {
      this.lookAt(res);
    } else {
      this[name] = res;
    }
  }
  return value === null ? attrNull: (typeof value === "function" ? attrFunction: attrConstant);
}
