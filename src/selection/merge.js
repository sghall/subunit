import Selection from '../Selection';

export default function(selection) {

  const groups0 = this._groups;
  const groups1 = selection._groups;
  const m0 = groups0.length;
  const m1 = groups1.length;
  const m = Math.min(m0, m1);
  const merges = new Array(m0);

  let j = 0;

  for (; j < m; ++j) {

    const group0 = groups0[j];
    const group1 = groups1[j];
    const n = group0.length;
    const merge = merges[j] = new Array(n);

    for (let node, i = 0; i < n; ++i) {
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
