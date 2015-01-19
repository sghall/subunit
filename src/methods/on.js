export function on(type, listener) {
  return this.each(selection_on(type, listener));
}

function selection_on(type, listener) {

  var wrapped = function () {
    return function (event) {
      return listener.call(this, event, this.__data__);
    };
  };

  function onRemove() {
    this.removeEventListener(type, wrapped());
  }

  function onAdd() {
    this.addEventListener(type, wrapped());
  }

  return listener === null ? onRemove: onAdd;
}