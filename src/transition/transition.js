import { transitionNode } from './transitionNode';
import { Transition } from '../Transition';
import { Selection } from '../Selection';
import { transitionInheritID } from '../selection/transition';

export function transition() {
  const id0 = this.id;
  const id1 = transitionInheritID;
  const ns = this.namespace;

  const subgroups = [];

  let subgroup;
  let node;

  for (let j = 0, m = this.length; j < m; j++) {
    subgroups.push(subgroup = []);

    for (let group = this[j], i = 0, n = group.length; i < n; i++) {
      if ((node = group[i])) {
        const trans = node[ns][id0];
        transitionNode(node, i, ns, id1, { ...trans, delay: trans.delay + trans.duration });
      }
      subgroup.push(node);
    }
  }

  return Transition.factory(subgroups, ns, id1);
}

export function transitionSelection(selection, name) {
  if (selection && selection.transition) {
    return transitionInheritID ? selection.transition(name) : selection;
  }

  return Selection.from([]).transition(selection);
}
