import { SubUnitArray } from './SubUnitArray';
import { tagged } from '../selection/tagged';
import { remove } from '../selection/remove';

export class Selection extends SubUnitArray {
  constructor(input) {
    super(input);
  }
}

Selection.prototype.tagged = tagged;
Selection.prototype.remove = remove;

