import { classed } from "../methods/classed";
import { tagged } from "../methods/tagged";
import { append } from "../methods/append";
import {  empty } from "../methods/empty";
import {  node  } from "../methods/node";
import {  call  } from "../methods/call";
import {  data  } from "../methods/data";
import { remove } from "../methods/remove";
import {  attr  } from "../methods/attr";
import {  prop  } from "../methods/prop";
import {  sort  } from "../methods/sort";
import { filter } from "../methods/filter";
import {  datum } from "../methods/datum";
import {  each  } from "../methods/each";
import {  on } from "../methods/on";

import { select } from "../methods/select";
import { selectAll } from "../methods/selectAll";

var selectionMethods = {};

selectionMethods.classed = classed;
selectionMethods.tagged  = tagged;
selectionMethods.append  = append;
selectionMethods.empty   = empty;
selectionMethods.node    = node;
selectionMethods.call    = call;
selectionMethods.data    = data;
selectionMethods.remove  = remove;
selectionMethods.attr    = attr;
selectionMethods.prop    = prop;
selectionMethods.sort    = sort;
selectionMethods.filter  = filter;
selectionMethods.datum   = datum;
selectionMethods.each    = each;
selectionMethods.on      = on;

selectionMethods.select    = select;
selectionMethods.selectAll = selectAll;

export function extend_selection(object) {
  for (var property in selectionMethods) {
    object[property] = selectionMethods[property];
  }
  return object;
}