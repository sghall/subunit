
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
      this.rotateX(value.x || 0);
      this.rotateY(value.y || 0);
      this.rotateZ(value.z || 0);
    } else if (name === "translation" ) {
      this.translateX(value.x || 0);
      this.translateY(value.y || 0);
      this.translateZ(value.z || 0);
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
      this.rotateX(res.x || 0);
      this.rotateY(res.y || 0);
      this.rotateZ(res.z || 0);
    } else if (name === "translation" ) {
      this.translateX(res.x || 0);
      this.translateY(res.y || 0);
      this.translateZ(res.z || 0);
    } else if (name === "lookAt") {
      this.lookAt(res);
    } else {
      this[name] = res;
    }
  }
  return value === null ? attrNull: (typeof value === "function" ? attrFunction: attrConstant);
}
