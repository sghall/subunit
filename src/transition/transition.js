import { Transition } from '../core/Transition';
import { Selection } from '../core/Selection';
import { transitionInheritId } from '../selection/transition';

export function transition(groups, ns, id) {
  groups.namespace = ns;
  groups.id = id;

  return Transition.from(groups);
}

export function transitionSelection(selection, name) {
  if (selection && selection.transition) {
    return transitionInheritId ? selection.transition(name) : selection;
  } else {
    return Selection.from([]).transition(selection);
  }
}
