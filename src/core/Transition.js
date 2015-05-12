import { SubUnitArray } from './SubUnitArray';
import { tagged } from '../selection/tagged';
import { remove } from '../selection/remove';
import { duration } from '../transition/duration';
import { delay } from '../transition/delay';
import { attr } from '../transition/attr';
import { ease } from '../transition/ease';
import { transition } from '../transition/transition';
import { each } from '../transition/each';

export class Transition extends SubUnitArray {
  constructor(input) {
    super(input);
  }
}

Transition.prototype.tagged = tagged;
Transition.prototype.duration = duration;
Transition.prototype.delay = delay;
Transition.prototype.remove = remove;
Transition.prototype.attr = attr;
Transition.prototype.ease = ease;
Transition.prototype.each = each;
Transition.prototype.transition = transition;
