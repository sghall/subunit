import { transitionNode } from '../transition/transitionNode';
import { Transition } from '../core/Transition';

export var transitionID = 0;
export var transitionInherit = null;
export var transitionInheritID = null;

export function transition(name) {
  var id = transitionInheritID || ++transitionID;
  var ns = transitionNamespace(name);
  var subgroups = [], subgroup, node;

  var props = transitionInherit || {time: Date.now(), ease: easeCubicInOut, delay: 0, duration: 250};

  for (var j = -1, m = this.length; ++j < m; ) {
    subgroups.push(subgroup = []);
    for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
      if (node = group[i]) {
        transitionNode(node, i, ns, id, props);
      }
      subgroup.push(node);
    }
  }

  return transitionFactory(subgroups, ns, id);
}

function easeCubicInOut(t) {
  if (t <= 0) {
    return 0;
  }
  if (t >= 1) {
    return 1;
  }
  var t2 = t * t, t3 = t2 * t;
  return 4 * (t < .5 ? t3 : 3 * (t - t2) + t3 - .75);
}

function transitionNamespace(name) {
  return name == null ? "__transition__" : "__transition_" + name + "__";
}

function transitionFactory(groups, ns, id) {
  var trans = Transition.from(groups);
  trans.namespace = ns;
  trans.id = id;

  return trans;
}
