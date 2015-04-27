import { each } from "../selection/each";

export function delay(value) {
  var id = this.id, ns = this.namespace;
  if (arguments.length < 1) {
    return this.node()[ns][id].delay;
  }
  return each(this, typeof value === "function"
      ? function(node, i, j) { node[ns][id].delay = +value.call(node, node.__data__, i, j); }
      : (value = +value, function(node) { node[ns][id].delay = value; }));
}

