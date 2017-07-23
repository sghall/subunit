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
  var timing;

  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      return defaultTiming.time = now(), defaultTiming;
    }
  }

  return timing;
}

export default function(name) {
  var id;
  var timing;

  if (name instanceof Transition) {
    id = name._id, name = name._name;
  } else {
    id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + '';
  }

  const groups = this._groups;
  const m = groups.length;

  for (var j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if ((node = group[i])) {
        schedule(node, name, id, i, group, timing || inherit(node, id));
      }
    }
  }

  return new Transition(groups, this._parents, name, id);
}
