import { SubUnitArray } from './SubUnitArray';
import { tagged } from '../selection/tagged';
import { remove } from '../selection/remove';
import { duration } from '../transition/duration';
import { delay } from '../transition/delay';
import { attr } from '../transition/attr';
import { ease } from '../transition/ease';
import { transition } from '../transition/transition';
import { each } from '../transition/each';
import { select } from '../transition/select';

export class Transition extends SubUnitArray {
  constructor(input) {
    super(input);
  }

  static factory(groups, ns, id) {
    var trans = Transition.from(groups);
    trans.namespace = ns;
    trans.id = id;

    return trans;
  }
}

Transition.prototype.tagged = tagged;
Transition.prototype.duration = duration;
Transition.prototype.delay = delay;
Transition.prototype.remove = remove;
Transition.prototype.attr = attr;
Transition.prototype.ease = ease;
Transition.prototype.each = each;
Transition.prototype.select = select;
Transition.prototype.transition = transition;
