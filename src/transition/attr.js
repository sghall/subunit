import { interpolateObject } from 'd3-interpolate';
import { tweenValue } from './tween';

function attrFunction(name, value) {
  return function() {
    var b = value(this);

    if (b == null) {
      return null;
    }

    var a = {
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

    var i = interpolateObject(a, b);

    function tween(t) {
      var update = i(t);

      function updater(d) {
        this[name][d] = update[d];
      }

      Object.keys(update).forEach(updater.bind(this));
    }

    return tween.bind(this);
  };
}

export default function(name, value) {
  return this.attrTween(name, attrFunction(name, tweenValue(this, 'attr.' + name, value)));
}
