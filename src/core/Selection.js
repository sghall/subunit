import { SubUnitArray } from './SubUnitArray';
import { append } from '../selection/append';
import { tagged } from '../selection/tagged';
import { remove } from '../selection/remove';

export class Selection extends SubUnitArray {
  constructor() {
    super();
  }
}

Selection.append = append;
Selection.tagged = tagged;
Selection.remove = remove;

var arr = new Selection();

console.log(window.arr = arr);
