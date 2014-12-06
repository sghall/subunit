import { append } from "../methods/append";
import {  empty } from "../methods/empty";
import {  node  } from "../methods/node";
import {  call  } from "../methods/call";

import { extend_selection } from "./extend_selection";

var enterMethods = {};

enterMethods.append = append;
enterMethods.empty  = empty;
enterMethods.node   = node;
enterMethods.call   = call;

enterMethods.select = function(selector) {
  var subgroups = [], subgroup, upgroup, group;
  var subnode, node;

  for (var j = -1, m = this.length; ++j < m;) {
    upgroup = (group = this[j]).update;
    subgroups.push(subgroup = []);
    subgroup.parentNode = group.parentNode;
    for (var i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i, j));
        subnode.__data__ = node.__data__;
      } else {
        subgroup.push(null);
      }
    }
  }
  return extend_selection(subgroups);
};

export function extend_enter(object) {
  for (var property in enterMethods) {
    object[property] = enterMethods[property];
  }
  return object;
}