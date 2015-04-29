import { SubUnitArray } from './SubUnitArray';
import { tagged } from '../selection/tagged';
import { remove } from '../selection/remove';

export class Transition extends SubUnitArray {
  constructor(input) {
    super(input);
  }
}

Transition.prototype.tagged = tagged;
Transition.prototype.remove = remove;
