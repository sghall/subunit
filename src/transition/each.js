import { transitionInherit, transitionInheritId } from './transition';
import { each } from '../selecion/each';
import d3 from 'd3';

export function each(type, listener) {
  var id = this.id, ns = this.namespace;

  if (arguments.length < 2) {
    var inherit = transitionInherit, inheritId = transitionInheritId;
    try {
      transitionInheritId = id;
      each(this, function(node, i, j) {
        transitionInherit = node[ns][id];
        type.call(node, node.__data__, i, j);
      });
    } finally {
      transitionInherit = inherit;
      transitionInheritId = inheritId;
    }
  } else {
    each(this, function(node) {
      var transition = node[ns][id];
      (transition.event || (transition.event = d3.dispatch("start", "end", "interrupt"))).on(type, listener);
    });
  }
  return this;
}

