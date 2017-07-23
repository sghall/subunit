import Selection from '../Selection';

export default function(selection) {

  var groups0 = this._groups;
  var groups1 = selection._groups;
  var m0 = groups0.length;
  var m1 = groups1.length;
  var m = Math.min(m0, m1);
  var merges = new Array(m0);

  var j = 0;

  for (; j < m; ++j) {

    var group0 = groups0[j];
    var group1 = groups1[j];
    var n = group0.length;
    var merge = merges[j] = new Array(n);

    for (var node, i = 0; i < n; ++i) {
      if ((node = group0[i] || group1[i])) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Selection(merges, this._parents);
}
