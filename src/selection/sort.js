import Selection from '../Selection';

export default function(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  const groups = this._groups;
  const m = groups.length;
  const sortgroups = new Array(m);

  for (let j = 0; j < m; ++j) {
    const group = groups[j];
    const n = group.length;
    const sortgroup = sortgroups[j] = new Array(n);

    for (let node, i = 0; i < n; ++i) {
      if ((node = group[i])) {
        sortgroup[i] = node;
      }
    }

    sortgroup.sort(compareNode);
  }

  return new Selection(sortgroups, this._parents);
}

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
