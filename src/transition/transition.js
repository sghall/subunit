import { Transition } from '../core/Transition';
import { Selection } from '../core/Selection';
import { transitionInheritId } from '../selection/transition';
import { transitionNode } from '../transition/transitionNode';

export function transition() {
  var id0 = this.id;
  var id1 = transitionInheritId;
  var ns = this.namespace;
  var subgroups = [], subgroup, node;
  var trans;

  for (var j = 0, m = this.length; j < m; j++) {
    subgroups.push(subgroup = []);
    for (var group = this[j], i = 0, n = group.length; i < n; i++) {
      if (node = group[i]) {
        trans = node[ns][id0];
        transitionNode(node, i, ns, id1, {time: trans.time, ease: trans.ease, delay: trans.delay + trans.duration, duration: trans.duration});
      }
      subgroup.push(node);
    }
  }

  return transitionFactory(subgroups, ns, id1);
}

export function transitionSelection(selection, name) {
  if (selection && selection.transition) {
    return transitionInheritId ? selection.transition(name) : selection;
  } else {
    return Selection.from([]).transition(selection);
  }
}

function transitionFactory(groups, ns, id) {
  var trans = Transition.from(groups);
  trans.namespace = ns;
  trans.id = id;

  return trans;
}
