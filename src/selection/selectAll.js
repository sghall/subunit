import { search } from '../utils/utils';
import Selection from '../Selection';

export default function selectAll(select) {
  const parents = [];
  const subgroups = [];

  if (typeof select !== 'function') select = selectionSelectorAll(select);

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if ((node = group[i])) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new Selection(subgroups, parents);
}

export function selectionSelectorAll(selector) {
  return typeof selector === 'function' ? selector : function searchSelection() {
    return search(this, selector);
  };
}
