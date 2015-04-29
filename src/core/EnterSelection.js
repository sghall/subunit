import { SubUnitArray } from './SubUnitArray';
import { Selection } from './Selection';

export class EnterSelection extends SubUnitArray {
  constructor(input) {
    super(input);
  }
}

EnterSelection.prototype.select = function (selector) {
  var subgroups = [], subgroup, upgroup, group;
  var subnode, node;

  for (var j = -1, m = this.length; ++j < m; ) {
    upgroup = (group = this[j]).update;
    subgroups.push(subgroup = []);
    subgroup.parentNode = group.parentNode;
    for (var i = -1, n = group.length; ++i < n; ) {
      if (node = group[i]) {
        subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i, j));
        subnode.__data__ = node.__data__;
      } else {
        subgroup.push(null);
      }
    }
  }
  return Selection.from(subgroups);
};
