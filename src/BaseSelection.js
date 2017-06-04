import BaseArray from './BaseArray';
import tagged from './selection/tagged';
import remove from './selection/remove';
import datum from './selection/datum';
import prop from './selection/prop';
import sort from './selection/sort';
import each from './selection/each';
import on from './selection/on';

export class BaseSelection extends BaseArray {
  constructor(input) {
    super(input);
  }
}

BaseSelection.prototype.tagged = tagged;
BaseSelection.prototype.remove = remove;
BaseSelection.prototype.datum = datum;
BaseSelection.prototype.prop = prop;
BaseSelection.prototype.sort = sort;
BaseSelection.prototype.each = each;
BaseSelection.prototype.on = on;