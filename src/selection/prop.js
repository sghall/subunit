
export function prop(name, value) {

  if (arguments.length < 2) {

    if (typeof name === "string") {
      return this.node()[name];
    }

    for (value in name) {
      this.each(getProperty(value, name[value]));
    }
    return this;
  }
  return this.each(getProperty(name, value));
}

function getProperty(name, value) {

  function propertyNull() {
    delete this[name];
  }

  function propertyConstant() {
    this[name] = value;
  }

  function propertyFunction() {
    var x = value.apply(this, arguments);
    if (x == null) {
      delete this[name];
    } else {
      this[name] = x;
    }
  }

  return value == null ?
    propertyNull : (typeof value === "function" ?
    propertyFunction : propertyConstant);
}
