// @flow weak
/* eslint no-cond-assign:"off", no-use-before-define: "off", no-underscore-dangle: "off" */

import { Selection } from '../Selection';
import { search } from '../utils/utils';

export default function filter(fun) {
  const subgroups = [];

  let subgroup;
  let group;
  let node;

  if (typeof fun !== 'function') {
    fun = selectionFilter(fun);
  }

  for (let j = 0, m = this.length; j < m; j++) {
    subgroups.push(subgroup = []);
    subgroup.parentNode = (group = this[j]).parentNode;

    for (let i = 0, n = group.length; i < n; i++) {
      if ((node = group[i]) && fun.call(node, node.__data__, i, j)) {
        subgroup.push(node);
      }
    }
  }
  return Selection.from(subgroups);
}

function selectionFilter(selector) {
  return function filterSelection() {
    return search(this, selector, true);
  };
}

