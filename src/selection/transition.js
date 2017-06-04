import { transitionNode } from '../../node_modules/antigen/transition/transitionNode';
import { Transition } from '../Transition';

const deafults = {
  time: Date.now(),
  ease: function easeCubicInOut(t) {
    if (t <= 0) {
      return 0;
    }
    if (t >= 1) {
      return 1;
    }
    const t2 = t * t;
    const t3 = t2 * t;

    return 4 * (t < 0.5 ? t3 : 3 * (t - t2) + t3 - 0.75);
  },
  delay: 0,
  duration: 250,
};

export let transitionID = 0;
export let transitionInherit = null;
export let transitionInheritID = null;

export function transition(name) {
  const id = transitionInheritID || ++transitionID;
  const ns = transitionNamespace(name);

  const subgroups = [];

  let subgroup;
  let node;

  const props = transitionInherit || deafults;

  for (let j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    for (let group = this[j], i = -1, n = group.length; ++i < n;) {
      if ((node = group[i])) {
        transitionNode(node, i, ns, id, props);
      }
      subgroup.push(node);
    }
  }

  return Transition.factory(subgroups, ns, id);
}

function transitionNamespace(name) {
  return name == null ? '__transition__' : `__transition_${name}__`;
}
