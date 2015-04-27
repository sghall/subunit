import { SubUnitArray } from './SubUnitArray';
import { tagged } from '../selection/tagged';
import { remove } from '../selection/remove';

export class Selection extends SubUnitArray {
  constructor() {
    super();
  }
}

Selection.prototype.tagged = tagged;
Selection.prototype.remove = remove;

var arr = new Selection();

console.log(window.arr = arr);
