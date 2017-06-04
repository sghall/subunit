import { search } from '../utils/utils';
import Selection from '../Selection';

export default function select(select) {
  if (typeof select !== 'function') select = selector(select);

  const groups = this._groups;
  const m = groups.length;
  const subgroups = new Array(m);

  for (let j = 0; j < m; ++j) {
    for (let group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ('__data__' in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new Selection(subgroups, this._parents);
}

function selector(selector) {
  return function searchTree() {
    return search(this, selector);
  };
}
