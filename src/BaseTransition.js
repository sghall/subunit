import BaseArray from './BaseArray';
import duration from './transition/duration';
import tagged from './selection/tagged';
import remove from './selection/remove';
import delay from './transition/delay';
import ease from './transition/ease';
import each from './transition/each';

export class BaseTransition extends BaseArray {
  constructor(input) {
    super(input);
  }

  static factory(groups, ns, id) {
    const trans = BaseTransition.from(groups);
    trans.namespace = ns;
    trans.id = id;

    return trans;
  }
}

BaseTransition.prototype.duration = duration;
BaseTransition.prototype.tagged = tagged;
BaseTransition.prototype.remove = remove;
BaseTransition.prototype.delay = delay;
BaseTransition.prototype.ease = ease;
BaseTransition.prototype.each = each;