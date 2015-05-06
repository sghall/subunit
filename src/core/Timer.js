let timerqueueHead, timerqueueTail;

let timerinterval; // is an interval (or frame) active?
let timertimeout;  // is a timeout active?

export var activeTimer;   // active timer object

let timerframe = window.requestAnimationFrame || function(callback) { setTimeout(callback, 17); };

// The timer will continue to fire until callback returns true.
export var createTimer = function(callback, delay, then) {
  let n = arguments.length;
  if (n < 2) {
    delay = 0;
  }
  if (n < 3) {
    then = Date.now();
  }

  let time = then + delay;
  let timer = {c: callback, t: time, f: false, n: null};

  if (timerqueueTail) {
    timerqueueTail.n = timer;
  } else {
    timerqueueHead = timer;
  }

  timerqueueTail = timer;

  if (!timerinterval) {
    timertimeout = clearTimeout(timertimeout);
    timerinterval = 1;
    timerframe(timerstep);
  }
};

function timerstep() {
  let now = timermark();
  let delay = timersweep() - now;

  if (delay > 24) {
    if (isFinite(delay)) {
      clearTimeout(timertimeout);
      timertimeout = setTimeout(timerstep, delay);
    }
    timerinterval = 0;
  } else {
    timerinterval = 1;
    timerframe(timerstep);
  }
}

export var flush = function() {
  timermark();
  timersweep();
};

function timermark() {
  let now = Date.now();
  activeTimer = timerqueueHead;
  while (activeTimer) {
    if (now >= activeTimer.t) {
      activeTimer.f = activeTimer.c(now - activeTimer.t);
    }
    activeTimer = activeTimer.n;
  }
  return now;
}

// Flush after callbacks to avoid concurrent queue modification.
// Returns the time of the earliest active timer, post-sweep.
function timersweep() {
  let t0, t1 = timerqueueHead, time = Infinity;

  while (t1) {
    if (t1.f) {
      t1 = t0 ? t0.n = t1.n : timerqueueHead = t1.n;
    } else {
      if (t1.t < time) {
        time = t1.t;
      }
      t1 = (t0 = t1).n;
    }
  }
  timerqueueTail = t0;
  return time;
}
