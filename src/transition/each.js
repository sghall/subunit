import { dispatch } from 'd3-dispatch';
import { selectionEach } from '../selection/each';

export function each(type, listener) {
  const id = this.id, ns = this.namespace;
  if (arguments.length < 2) {
    throw new Error('type and listener required');
  } else {
    selectionEach(this, function(node) {
      const transition = node[ns][id];
      (transition.event || (transition.event = dispatch('start', 'end', 'interrupt'))).on(type, listener);
    });
  }
  return this;
}
