import { interpolateObject } from 'd3-interpolate';
import { tweenValue } from './tween';

function attrFunction(name, value) {
  return function() {
    const b = value(this);

    if (b == null) {
      return null;
    }

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

    return (t) => {
      const update = i(t);

      Object.keys(update).forEach((d) => {
        this[name][d] = update[d];
      });
    };
  };
}

export default function(name, value) {
  return this.attrTween(name, attrFunction(name, tweenValue(this, 'attr.' + name, value)));
}
