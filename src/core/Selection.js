import { SubUnitArray } from './SubUnitArray';
import { data } from '../selection/data';
import { attr } from '../selection/attr';
import { tagged } from '../selection/tagged';
import { remove } from '../selection/remove';

export class Selection extends SubUnitArray {
  constructor(input) {
    super(input);
  }
}

Selection.prototype.data = data;
Selection.prototype.attr = attr;
Selection.prototype.tagged = tagged;
Selection.prototype.remove = remove;

