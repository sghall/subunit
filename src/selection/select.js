import { search } from '../utils/utils';
import Selection from '../Selection';

export default function select(selector) {
  if (typeof selector !== 'function') selector = searchSelector(selector);

  var groups = this._groups;
  var m = groups.length;
  var subgroups = new Array(m);

  for (var j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = selector.call(node, node.__data__, i, group))) {
        if ('__data__' in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new Selection(subgroups, this._parents);
}

function searchSelector(selector) {
  return function searchTree() {
    return search(this, selector);
  };
}
