// import BaseSelection from './BaseSelection';
import filter from './selection/filter';
import data from './selection/data';
import enter from './selection/enter';
import select from './selection/select';
import attr from './selection/attr';
import tagged from './selection/tagged';
import append from './common/append';
import selectAll from './selection/selectAll';
import node from 'd3-selection/src/selection/node';
import each from 'd3-selection/src/selection/each';
import size from 'd3-selection/src/selection/size';

// import data from './selection/data';
// import attr from './selection/attr';
// import transition from './selection/transition';
// import selectAll from './selection/selectAll';
// import select from './selection/select';
// import append from './common/append';


export default function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

// function selection() {
//   return new Selection([[document.documentElement]], root);
// }


// export default class Selection extends BaseSelection {
//   constructor(input) {
//     super(input);
//   }
// }

Selection.prototype.filter = filter;
Selection.prototype.data = data;
Selection.prototype.each = each;
Selection.prototype.size = size;
Selection.prototype.enter = enter;
Selection.prototype.attr = attr;
Selection.prototype.append = append;
Selection.prototype.tagged = tagged;
Selection.prototype.select = select;
Selection.prototype.selectAll = selectAll;
Selection.prototype.node = node;

// Selection.prototype.data = data;
// Selection.prototype.attr = attr;
// Selection.prototype.transition = transition;
// Selection.prototype.selectAll = selectAll;
// Selection.prototype.select = select;
// Selection.prototype.append = append;
