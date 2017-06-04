import { interpolateObject } from 'd3-interpolate';
import { get, set } from 'd3-transition/src/transition/schedule';

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

  return transitionTween(this, `attr.${name}`, attrTween(value));
}

export function transitionTween(transition, name, value) {
  const id = transition._id;

  transition.each(function() {
    const schedule = set(this, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });

  return function(node) {
    return get(node, id).value[name];
  };
}
