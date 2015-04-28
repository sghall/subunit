import { SubUnitArray } from './SubUnitArray';
import { tagged } from '../selection/tagged';
import { remove } from '../selection/remove';

export class Transition extends SubUnitArray {
  constructor() {
    super();
  }
}

Transition.prototype.tagged = tagged;
Transition.prototype.remove = remove;
