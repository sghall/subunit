import { Selection } from "../core/Selection";
import { EnterSelection } from "../core/EnterSelection";
import { getBind } from './bind';

export function data(value, key) {
  var i = -1, n = this.length, group, node;

  if (!arguments.length) {
    value = new Array(n = (group = this[0]).length);
    while (++i < n) {
      if (node = group[i]) {
        value[i] = node.__data__;
      }
    }
    return value;
  }

  var enter  = new EnterSelection();
  var update = new Selection();
  var exit   = new Selection();

  var bind = getBind(enter, update, exit, key);

  if (typeof value === "function") {
    while (++i < n) {
      bind(group = this[i], value.call(group, group.parentNode.__data__, i));
    }
  } else {
    while (++i < n) {
      bind(group = this[i], value);
    }
  }

  update.enter = function() { return enter; };
  update.exit  = function() { return exit; };
  return update;
}
