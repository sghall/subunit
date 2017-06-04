import { search, array } from '../utils/utils';
import { Selection } from '../Selection';

export default function selectAll(selector) {
  const subgroups = [];

  let subgroup;
  let node;

  selector = selectionSelectorAll(selector);

  for (let j = -1, m = this.length; ++j < m;) {
    for (let group = this[j], i = -1, n = group.length; ++i < n;) {
      if ((node = group[i])) {
        subgroups.push(subgroup = array(selector.call(node, node.__data__, i, j)));
        subgroup.parentNode = node;
      }
    }
  }

  return Selection.from(subgroups);
}

export function selectionSelectorAll(selector) {
  return typeof selector === 'function' ? selector : function searchSelection() {
    return search(this, selector);
  };
}
