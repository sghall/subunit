import { SubUnitArray } from './SubUnitArray';
import { append } from '../selection/append';

export class Selection extends SubUnitArray {
  constructor() {
    super();
  }
}

Selection.append = append;

var arr = new Selection();

console.log(window.arr = arr);
