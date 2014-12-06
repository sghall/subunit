import { search, array } from "../core/utils";
import { extend_selection } from "../core/extend_selection";

export function selectAll(selector) {
  var subgroups = [], subgroup, node;

  selector = _selection_selectorAll(selector);

  for (var j = -1, m = this.length; ++j < m;) {
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subgroups.push(subgroup = array(selector.call(node, node.__data__, i, j)));
        subgroup.parentNode = node;
      }
    }
  }
  return extend_selection(subgroups);
}

function _selection_selectorAll(selector) {
  return typeof selector === "function" ? selector : function() {
    return search(this, selector, true);
  };
}

