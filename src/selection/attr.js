export function attr(name, value) {

  if (arguments.length < 2) {

    for (value in name) {
      this.each(_selection_attr(value, name[value]));
    }
    return this;
  }
  return this.each(_selection_attr(name, value));
}

function _selection_attr(name, value) {

  function attrNull() {
    delete this[name];
  }

  function attrConstant() {
    if (name === "tags" || name === "class") {
      var arr = value.split(" ");
      for (var i = 0; i < arr.length; i++) {
        this.__tags__.push(arr[i]);
      }
    } else {
      this[name] = value;
    }
  }

  function attrFunction() {
    var x = value.apply(this, arguments);
    if (x === null) {
      return this[name] && delete this[name];
    } else {
      this[name] = x;
    }
  }
  return value === null ? attrNull: (typeof value === "function" ? attrFunction: attrConstant);
}