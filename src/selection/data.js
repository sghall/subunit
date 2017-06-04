import { Selection } from '../Selection';
import { EnterSelection } from '../EnterSelection';
import bind from './bind';

export default function data(value, key) {
  let i = -1;
  let n = this.length;

  let node;
  let group;

  if (!arguments.length) {
    value = new Array(n = (group = this[0]).length);

    while (++i < n) {
      if ((node = group[i])) {
        value[i] = node.__data__;
      }
    }

    return value;
  }

  const enter = new EnterSelection();
  const update = new Selection();
  const exit = new Selection();

  const bound = bind(enter, update, exit, key);

  if (typeof value === 'function') {
    while (++i < n) {
      bound(group = this[i], value.call(group, group.parentNode.__data__, i));
    }
  } else {
    while (++i < n) {
      bound(group = this[i], value);
    }
  }

  update.enter = function getEnter() { return enter; };
  update.exit = function getExit() { return exit; };

  return update;
}
