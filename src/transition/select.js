import { transitionNode } from './transitionNode';
import { selectionSelectorAll } from '../selection/selectAll';
import { Transition } from '../Transition';

export default function select(selector) {
  const id = this.id;
  const ns = this.namespace;

  const subgroups = [];

  let subgroup;
  let subnode;
  let node;

  selector = selectionSelectorAll(selector);

  for (let j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);

    for (let group = this[j], i = -1, n = group.length; ++i < n;) {
      if ((node = group[i]) && (subnode = selector.call(node, node.__data__, i, j))) {
        if ('__data__' in node) {
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
