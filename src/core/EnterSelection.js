import { SubUnitArray } from './SubUnitArray';
import { tagged } from '../selection/tagged';
import { remove } from '../selection/remove';

export class EnterSelection extends SubUnitArray {
  constructor() {
    super();
  }
}

EnterSelection.prototype.tagged = tagged;
EnterSelection.prototype.remove = remove;

