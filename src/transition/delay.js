import { selectionEach } from '../selection/each';

export function delay(value) {
  const id = this.id;
  const ns = this.namespace;
  
  let callback;

  if (arguments.length < 1) {
    return this.node()[ns][id].delay;
  }

  if (typeof value === 'function') {
    callback = function(node, i, j) {
      node[ns][id].delay = +value.call(node, node.__data__, i, j);
    };
  } else {
    value = +value;

    callback = function(node) {
      node[ns][id].delay = value;
    };
  }

  return selectionEach(this, callback);
}

