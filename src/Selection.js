import BaseSelection from './BaseSelection';
import filter from './selection/filter';
import data from './selection/data';
import attr from './selection/attr';
import transition from './selection/transition';
import selectAll from './selection/selectAll';
import select from './selection/select';
import append from './common/append';

export class Selection extends BaseSelection {
  constructor(input) {
    super(input);
  }
}

Selection.prototype.filter = filter;
Selection.prototype.data = data;
Selection.prototype.attr = attr;
Selection.prototype.transition = transition;
Selection.prototype.selectAll = selectAll;
Selection.prototype.select = select;
Selection.prototype.append = append;