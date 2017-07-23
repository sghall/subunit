import Selection from '../Selection';

export default function(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  var groups = this._groups;
  var m = groups.length;
  var sortgroups = new Array(m);

  for (var j = 0; j < m; ++j) {
    var group = groups[j];
    var n = group.length;
    var sortgroup = sortgroups[j] = new Array(n);

    for (var node, i = 0; i < n; ++i) {
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
