// @flow weak
/* eslint no-use-before-define: "off", no-underscore-dangle: "off" */

import { search } from '../utils/utils';
import { Selection } from '../Selection';

export default function select(selector) {
  const subgroups = [];

  let subgroup;
  let subnode;
  let group;
  let node;

  selector = selectionSelector(selector);

  for (let j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    subgroup.parentNode = (group = this[j]).parentNode;

    for (let i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) { // eslint-disable-line no-cond-assign
        subgroup.push(subnode = selector.call(node, node.__data__, i, j));
        if (subnode && '__data__' in node) {
          subnode.__data__ = node.__data__;
        }
      } else {
        subgroup.push(null);
      }
    }
  }

  return Selection.from(subgroups);
}

function selectionSelector(selector) {
  return typeof selector === 'function' ? selector : function searchSelection() {
    return search(this, selector);
  };
}

