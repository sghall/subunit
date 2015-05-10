import { SubUnitArray } from './SubUnitArray';
import { tagged } from '../selection/tagged';
import { remove } from '../selection/remove';
import { duration } from '../transition/duration';
import { delay } from '../transition/delay';

export class Transition extends SubUnitArray {
  constructor(input) {
    super(input);
  }
}

Transition.prototype.tagged = tagged;
Transition.prototype.duration = duration;
Transition.prototype.delay = delay;
Transition.prototype.remove = remove;
