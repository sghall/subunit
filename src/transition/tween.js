import { get, set } from 'd3-transition/src/transition/schedule';

function tweenFunction(id, name, value) {
  var tween0;
  var tween1;

  if (typeof value !== 'function') throw new Error;
  
  return function() {
    const schedule = set(this, id);
    const tween = schedule.tween;

    if (tween !== tween0) {
      var i;
      var t;
      var n;

      tween1 = (tween0 = tween).slice();

      for (t = { name: name, value: value }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }

    schedule.tween = tween1;
  };
}

export default function(name, value) {
  const id = this._id;

  name += '';

  if (arguments.length < 2) {
    const tween = get(this.node(), id).tween;

    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }

    return null;
  }

  return this.each((tweenFunction)(id, name, value));
}

export function tweenValue(transition, name, value) {
  const id = transition._id;

  transition.each(function() {
    const schedule = set(this, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });

  return function(node) {
    return get(node, id).value[name];
  };
}
