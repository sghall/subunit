
export function on(type, listener) {
  return this.each(selectionOn(type, listener));
}

function selectionOn(type, listener) {

  function onRemove(d, i, j) { // NEEDS WORK
    this.removeEventListener(type, (function () {
      return function (event) {
        return listener.call(this, event, this.__data__, i, j);
      };
    }()));
  }

  function onAdd(d, i, j) {
    this.addEventListener(type, (function () {
      return function (event) {
        return listener.call(this, event, this.__data__, i, j);
      };
    }()));
  }

  return listener === null ? onRemove: onAdd;
}
