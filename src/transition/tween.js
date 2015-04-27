import { each } from "../selection/each";

export function tween(name, tweener) {
  var id = this.id;
  var ns = this.namespace;
  var callback;

  if (arguments.length < 2) {
    return this.node()[ns][id].tweener.get(name);
  }

  if (tweener === null) {
    callback = function(node) {
      node[ns][id].tweener.remove(name);
    };
  } else {
    callback = function(node) {
      node[ns][id].tweener.set(name, tweener);
    };
  }

  return each(this, callback);
}

// export function transitionTween(groups, name, value, tweener) {
//   var id = groups.id, ns = groups.namespace;
//   return each(groups, typeof value === "function"
//       ? function(node, i, j) { node[ns][id].tweener.set(name, tweener(value.call(node, node.__data__, i, j))); }
//       : (value = tweener(value), function(node) { node[ns][id].tweener.set(name, value); }));
// }
