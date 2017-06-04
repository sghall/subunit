import { selectionEach } from '../selection/each';

export function duration(value) {
  const id = this.id;
  const ns = this.namespace;
  
  let callback;

  if (arguments.length < 1) {
    return this.node()[ns][id].duration;
  }

  if (typeof value === 'function') {
    callback = function (node, i, j) {
      node[ns][id].duration = Math.max(1, value.call(node, node.__data__, i, j));
    };
  } else {
    value = Math.max(1, value);
    callback = function (node) {
      node[ns][id].duration = value;
    };
  }

  return selectionEach(this, callback);
}

