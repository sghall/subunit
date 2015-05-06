import d3 from 'd3';
import { SubUnitMap } from '../core/SubUnitMap';
import { activetimer } from '../core/Timer';

// export function transitionNode(node, i, ns, id, inherit) {
//   console.log("transition node:", node, "i ns id", i, ns, id);
//   return node;
// }

export function transitionNode(node, i, ns, id, inherit) {
  var lock = node[ns] || (node[ns] = {active: 0, count: 0});
  var transition = lock[id];

  if (!transition) {
    var time = inherit.time;

    transition = lock[id] = {
      tween: new SubUnitMap,
      time: time,
      delay: inherit.delay,
      duration: inherit.duration,
      ease: inherit.ease,
      index: i
    };

    inherit = null; // allow gc

    ++lock.count;

    d3.timer(function(elapsed) {
      let delay = transition.delay;
      let duration, ease;
      let timer = activetimer;
      let tweened = [];

      timer.t = delay + time;

      if (delay <= elapsed) {
        return start(elapsed - delay);
      }

      timer.c = start;

      function start(elapsed) {

        if (lock.active > id) {
          return stop();
        }

        let active = lock[lock.active];

        if (active) {
          --lock.count;
          delete lock[lock.active];

          if (active.event) {
             active.event.interrupt.call(node, node.__data__, active.index);
          }
        }

        lock.active = id;

        if (transition.event) {
           transition.event.start.call(node, node.__data__, i);
        }

        transition.tween.forEach(function(key, value) {
          if (value = value.call(node, node.__data__, i)) {
            tweened.push(value);
          }
        });

        // Deferred capture to allow tweens to initialize ease & duration.
        ease = transition.ease;
        duration = transition.duration;

        d3.timer(function() { // defer to end of current frame
          timer.c = tick(elapsed || 1) ? d3_true : tick;
          return 1;
        }, 0, time);
      }

      function tick(elapsed) {
        if (lock.active !== id) {
          return 1;
        }

        let t = elapsed / duration;
        let e = ease(t);
        let n = tweened.length;

        while (n > 0) {
          tweened[--n].call(node, e);
        }

        if (t >= 1) {
          if (transition.event) {
            transition.event.end.call(node, node.__data__, i);
          }
          return stop();
        }
      }

      function stop() {
        if (--lock.count) {
          delete lock[id];
        } else {
          delete node[ns];
        }
        return 1;
      }
    }, 0, time);
  }
}
