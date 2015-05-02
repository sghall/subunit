import { filter as selectionFilter } from '../selection/filter';
import { Transition } from '../core/Transition';

export function filter(value) {
  var subgroups = [], subgroup, group, node;

  if (typeof value !== "function") {
    value = selectionFilter(value);
  }

  let j, m;
  for (j = 0, m = this.length; j < m; j++) {
    subgroups.push(subgroup = []);
    let i, n;
    for (group = this[j], i = 0, n = group.length; i < n; i++) {
      if ((node = group[i]) && value.call(node, node.__data__, i, j)) {
        subgroup.push(node);
      }
    }
  }

  return Transition.from(subgroups, this.namespace, this.id);
}
