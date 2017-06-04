import d3 from 'd3';
import { selectionEach } from '../selection/each';

export function ease(value) {
  const id = this.id;
  const ns = this.namespace;

  if (arguments.length < 1) {
    return this.node()[ns][id].ease;
  }
  if (typeof value !== 'function') {
    value = d3.ease.apply(d3, arguments);
  }
  return selectionEach(this, node => node[ns][id].ease = value);
}
