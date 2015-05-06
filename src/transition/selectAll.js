import { selectionSelectorAll } from '../selection/selectAll';
import { transitionNode } from './transitionNode/transitionNode';
import { Transition } from '../core/Transition';

export function selectAll(selector) {
  var id = this.id;
  var ns = this.namespace;
  var subgroups = [], subgroup;
  var subnodes, subnode, node;
  var transition;

  selector = selectionSelectorAll(selector);

  for (var j = -1, m = this.length; ++j < m; ) {
    for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
      if (node = group[i]) {
        transition = node[ns][id];
        subnodes = selector.call(node, node.__data__, i, j);
        subgroups.push(subgroup = []);
        for (var k = -1, o = subnodes.length; ++k < o; ) {
          if (subnode = subnodes[k]) {
            transitionNode(subnode, k, ns, id, transition);
          }
          subgroup.push(subnode);
        }
      }
    }
  }

  return Transition.from(subgroups, ns, id);
}

