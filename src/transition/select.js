import { selectionSelectorAll } from '../selection/selectAll';
import { transitionNode } from './transitionNode/transitionNode';
import { Transition } from '../core/Transition';

export function select(selector) {
  var id = this.id;
  var ns = this.namespace;
  var subgroups = [], subgroup;
  var subnode, node;

  selector = selectionSelectorAll(selector);

  for (var j = -1, m = this.length; ++j < m; ) {
    subgroups.push(subgroup = []);
    for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
      if ((node = group[i]) && (subnode = selector.call(node, node.__data__, i, j))) {
        if ("__data__" in node) {
          subnode.__data__ = node.__data__;
        }
        transitionNode(subnode, i, ns, id, node[ns][id]);
        subgroup.push(subnode);
      } else {
        subgroup.push(null);
      }
    }
  }

  return Transition.from(subgroups, ns, id);
}

