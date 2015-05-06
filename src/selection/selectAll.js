import { search, array } from "../utils/utils";
import { Selection } from "../core/Selection";

export function selectAll(selector) {
  var subgroups = [], subgroup, node;

  selector = selectionSelectorAll(selector);

  for (var j = -1, m = this.length; ++j < m; ) {
    for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
      if (node = group[i]) {
        subgroups.push(subgroup = array(selector.call(node, node.__data__, i, j)));
        subgroup.parentNode = node;
      }
    }
  }
  return Selection.from(subgroups);
}

export function selectionSelectorAll(selector) {
  return typeof selector === "function" ? selector : function() {
    return search(this, selector);
  };
}

