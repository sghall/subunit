import { selectionEach } from "../selection/each";

export function delay(value) {
  var id = this.id;
  var ns = this.namespace;
  var callback;

  if (arguments.length < 1) {
    return this.node()[ns][id].delay;
  }

  if (typeof value === "function") {
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

