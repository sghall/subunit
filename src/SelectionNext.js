// *********************************************************
// IMPORTED D3 SELCTION SOURCE METHODS
// *********************************************************
import call from 'd3-selection/src/selection/call';
import nodes from 'd3-selection/src/selection/nodes';
import node from 'd3-selection/src/selection/node';
import size from 'd3-selection/src/selection/size';
import empty from 'd3-selection/src/selection/empty';
import each from 'd3-selection/src/selection/each';
import property from 'd3-selection/src/selection/property';
import datum from 'd3-selection/src/selection/datum';

// *********************************************************
// SUBUNIT SOURCE SELCTION METHODS
// *********************************************************
import select from './selection/select';
import selectAll from './selection/selectAll';
import append from './common/append';
import filter from './selection/filter';
import data from './selection/data';
import enter from './selection/enter';
import sort from './selection/sort';
import attr from './selection/attr';
import remove from './selection/remove';
import on from './selection/on';

// *********************************************************
// ON D3 SELCTION BUT NOT IMPLEMENTED IN SUBUNIT
// *********************************************************
// import exit from 'd3-selection/src/selection/exit';
// import merge from 'd3-selection/src/selection/merge';
// import order from 'd3-selection/src/selection/order';
// import style from 'd3-selection/src/selection/style';
// import classed from 'd3-selection/src/selection/classed';
// import text from 'd3-selection/src/selection/text';
// import html from 'd3-selection/src/selection/html';
// import raise from 'd3-selection/src/selection/raise';
// import lower from 'd3-selection/src/selection/lower';
// import insert from 'd3-selection/src/selection/insert';
// import dispatch from 'd3-selection/src/selection/dispatch';

export const root = [null];

export function Selection(groups, parents) {
  this.groups = groups;
  this.parents = parents;
}

function selection() {
  return new Selection([[document.documentElement]], root);
}

Selection.prototype = selection.prototype = {
  constructor: Selection,
  select,
  selectAll,
  filter,
  data,
  enter,
  sort,
  call,
  nodes,
  node,
  size,
  empty,
  each,
  attr,
  property,
  append,
  remove,
  datum,
  on,
};

export default selection;
