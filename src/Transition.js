import BaseTransition from './BaseTransition';
import attr from './transition/attr';
import select from './transition/select';
import selectAll from './transition/selectAll';
import transition from './transition/transition';

export class Transition extends BaseTransition {
  constructor(input) {
    super(input);
  }

  static factory(groups, ns, id) {
    const trans = Transition.from(groups);
    trans.namespace = ns;
    trans.id = id;

    return trans;
  }
}

Transition.prototype.attr = attr;
Transition.prototype.select = select;
Transition.prototype.selectAll = selectAll;
Transition.prototype.transition = transition;
