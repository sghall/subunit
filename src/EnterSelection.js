import BaseArray from './BaseArray';
import Selection from './Selection';
import append from './common/append';

export class EnterSelection extends BaseArray {
  constructor(input) {
    super(input);
  }
}

EnterSelection.prototype.select = function (selector) {
  const subgroups = [];

  let subgroup;
  let upgroup;
  let group;
  let subnode;
  let node;

  for (let j = -1, m = this.length; ++j < m;) {
    upgroup = (group = this[j]).update;
    subgroups.push(subgroup = []);
    subgroup.parentNode = group.parentNode;

    for (let i = -1, n = group.length; ++i < n;) {
      if ((node = group[i])) {
        subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i, j));
        subnode.__data__ = node.__data__;
      } else {
        subgroup.push(null);
      }
    }
  }

  return Selection.from(subgroups);
};

EnterSelection.prototype.append = append;
