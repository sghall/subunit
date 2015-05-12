import d3 from 'd3';
import { selectionEach } from "../selection/each";

export function attr(name, value) {

  if (arguments.length < 2) {
    for (value in name) {
      this.attr(value, name[value]);
    }
    return this;
  }

  var interpolate = d3.interpolateObject;

  function attrNull() {}

  function attrTween(b) {
    if (b == null) {
      return attrNull;
    } else {
      return function () {

        let a = {
          x: this[name].x,
          y: this[name].y,
          z: this[name].z
        };

        for (let key in a) {
          if (!b[key]) {
             delete a[key];
          }
        }

        let i = interpolate(a, b);

        return function (t) {
          let update = i(t);
          for (let key in update) {
            this[name][key] = update[key];
          }
        };
      };
    }
  }

  return transitionTween(this, "attr." + name, value, attrTween);
}

function transitionTween(groups, name, value, tween) {
  var id = groups.id, ns = groups.namespace;
  var callback;

  if (typeof value === "function") {
    callback = function(node, i, j) {
      let d = value.call(node, node.__data__, i, j);
      node[ns][id].tween.set(name, tween(d));
    };
  } else {
    value = tween(value);
    callback = function(node) {
      node[ns][id].tween.set(name, value);
    };
  }

  return selectionEach(groups, callback);
}
