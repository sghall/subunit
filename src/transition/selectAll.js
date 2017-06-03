// @flow weak
/* eslint no-use-before-define: "off", no-cond-assign: "off", no-underscore-dangle: "off" */

import { transitionNode } from '../../node_modules/antigen/transition/transitionNode';
import { selectionSelectorAll } from '../selection/selectAll';
import { Transition } from '../Transition';

export default function selectAll(selector) {
  const id = this.id;
  const ns = this.namespace;

  const subgroups = [];

  let subgroup;
  let subnodes;
  let subnode;
  let node;

  selector = selectionSelectorAll(selector);

  for (let j = -1, m = this.length; ++j < m;) {
    for (let group = this[j], i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        const transition = node[ns][id];
        subnodes = selector.call(node, node.__data__, i, j);
        subgroups.push(subgroup = []);

        for (let k = -1, o = subnodes.length; ++k < o;) {
          if (subnode = subnodes[k]) {
            transitionNode(subnode, k, ns, id, transition);
          }

          subgroup.push(subnode);
        }
      }
    }
  }

  return Transition.from(subgroups, ns, id);
}

