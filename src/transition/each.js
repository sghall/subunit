import d3 from 'd3';
import { selectionEach } from '../selection/each';

export function each(type, listener) {
  var id = this.id, ns = this.namespace;
  if (arguments.length < 2) {
    throw new Error('type and listener required');
  } else {
    selectionEach(this, function(node) {
      var transition = node[ns][id];
      (transition.event || (transition.event = d3.dispatch("start", "end", "interrupt"))).on(type, listener);
    });
  }
  return this;
}
