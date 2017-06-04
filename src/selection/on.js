
export default function on(type, listener) {
  return this.each(selectionOn(type, listener));
}

function selectionOn(type, listener) {
  function onRemove(d, i, j) {
    this.removeEventListener(type, (function selectionOnRemove() {
      return function selectionRemoveListener(event) {
        return listener.call(this, event, this.__data__, i, j);
      };
    }()));
  }

  function onAdd(d, i, j) {
    this.addEventListener(type, (function selectionOnAdd() {
      return function selectionAddListener(event) {
        return listener.call(this, event, this.__data__, i, j);
      };
    }()));
  }

  return listener === null ? onRemove : onAdd;
}
