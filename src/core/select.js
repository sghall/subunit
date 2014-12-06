import { search } from "./utils";
import { selection_extend } from "./selection_extend";

export function select (selector) {
  var subgroups = [], subgroup, group;
  var subnode, node;

  selector = _selection_selector(selector);

  for (var j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    subgroup.parentNode = (group = this[j]).parentNode;
    for (var i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subgroup.push(subnode = selector.call(node, node.__data__, i, j));
        if (subnode && "__data__" in node) {
          subnode.__data__ = node.__data__;
        }
      } else {
        subgroup.push(null);
      }
    }
  }
  return selection_extend(subgroups);
}

function _selection_selector(selector) {
  return typeof selector === "function" ? selector: function() {
    return search(this, selector, false);
  };
}

