import { Transition, newId } from '../Transition';
import schedule from 'd3-transition/src/transition/schedule';
import { now } from 'd3-timer';

const defaultTiming = {
  time: null,
  delay: 0,
  duration: 250,
  ease: function cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
  },
};

function inherit(node, id) {
  let timing;

  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      return defaultTiming.time = now(), defaultTiming;
    }
  }

  return timing;
}

export default function(name) {
  let id;
  let timing;

  if (name instanceof Transition) {
    id = name._id, name = name._name;
  } else {
    id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + '';
  }

  const groups = this._groups;
  const m = groups.length;

  for (let j = 0; j < m; ++j) {
    for (let group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if ((node = group[i])) {
        schedule(node, name, id, i, group, timing || inherit(node, id));
      }
    }
  }

  return new Transition(groups, this._parents, name, id);
}
