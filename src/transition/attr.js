import { interpolateObject } from 'd3-interpolate';
import { selectionEach } from './selection/each';

export default function attr(name, value) {
  if (arguments.length < 2) {
    Object.keys(name).forEach((d) => {
      this.attr(d, name[d]);
    });

    return this;
  }

  function attrNull() {}

  function attrTween(b) {
    if (b == null) {
      return attrNull;
    }

    return function tween() {
      const a = {
        x: this[name].x,
        y: this[name].y,
        z: this[name].z,
      };

      if (!b.x) {
        delete a.x;
      }

      if (!b.y) {
        delete a.y;
      }

      if (!b.z) {
        delete a.z;
      }

      const i = interpolateObject(a, b);

      return function subunitInterpol(t) {
        const update = i(t);

        Object.keys(update).forEach((d) => {
          this[name][d] = update[d];
        });
      };
    };
  }

  return transitionTween(this, `attr.${name}`, value, attrTween);
}

function transitionTween(groups, name, value, tween) {
  const id = groups.id;
  const ns = groups.namespace;

  let callback;

  if (typeof value === 'function') {
    callback = (node, i, j) => {
      const d = value.call(node, node.__data__, i, j);
      node[ns][id].tween.set(name, tween(d));
    };
  } else {
    value = tween(value);
    callback = (node) => {
      node[ns][id].tween.set(name, value);
    };
  }

  return selectionEach(groups, callback);
}
