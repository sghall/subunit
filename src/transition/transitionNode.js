import { DataMap } from '../DataMap';
import { activeTimer, createTimer } from '../Timer';

export function transitionNode(node, i, ns, id, inherit) {
  const lock = node[ns] || (node[ns] = { active: 0, count: 0 });
  
  let transition = lock[id];

  if (!transition) {
    const time = inherit.time;

    transition = lock[id] = {
      tween: new DataMap(),
      time,
      delay: inherit.delay,
      duration: inherit.duration,
      ease: inherit.ease,
      index: i
    };

    inherit = null; // allow gc

    ++lock.count;

    createTimer(function(elapsed) {
      const delay = transition.delay;

      let duration;
      let ease;

      const timer = activeTimer;
      const tweened = [];

      timer.t = delay + time;

      if (delay <= elapsed) {
        return start(elapsed - delay);
      }

      timer.c = start;

      function start(elapsedMinusDelay) {

        if (lock.active > id) {
          return stop();
        }

        const active = lock[lock.active];

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
          if ((value = value.call(node, node.__data__, i))) {
            tweened.push(value);
          }
        });

        // Deferred capture to allow tweens to initialize ease & duration.
        ease = transition.ease;
        duration = transition.duration;

        createTimer(function() { // defer to end of current frame
          timer.c = tick(elapsedMinusDelay || 1) ? () => true : tick;
          return 1;
        }, 0, time);
      }

      function tick(haveElapsed) {
        if (lock.active !== id) {
          return 1;
        }

        const t = haveElapsed / duration;
        const e = ease(t);
        
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
