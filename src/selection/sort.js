
export function sort(comparator) {
  comparator = selectionSortComparator.apply(this, arguments);
  for (var j = -1, m = this.length; ++j < m; ) {
    this[j].sort(comparator);
  }
  return this;
}

function selectionSortComparator(comparator) {
  if (!arguments.length) {
    comparator = ascending;
  }
  return function(a, b) {
    return a && b ? comparator(a.__data__, b.__data__) : !a - !b;
  };
}

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
