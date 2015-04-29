import { search } from "../utils/utils";
import { Selection } from "../core/Selection";

export function select(selector) {
  var subgroups = [], subgroup, subnode, group, node;

  selector = selectionSelector(selector);

  for (var j = -1, m = this.length; ++j < m; ) {
    subgroups.push(subgroup = []);
    subgroup.parentNode = (group = this[j]).parentNode;

    for (var i = -1, n = group.length; ++i < n; ) {
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

  return Selection.from(subgroups);
}

function selectionSelector(selector) {
  return typeof selector === "function" ? selector : function() {
    return search(this, selector);
  };
}

