import { selectionEach } from "../selection/each";

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

  return selectionEach(this, callback);
}
