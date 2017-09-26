import Selection from '../Selection';
import { search } from '../utils/utils';

export default function(match) {
  if (typeof match !== 'function') match = selectionFilter(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Selection(subgroups, this._parents);
}

function selectionFilter(selector) {
  return function filterSelection() {
    return search(this, selector, true).length > 0;
  };
}
