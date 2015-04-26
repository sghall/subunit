
// Adapted from https://github.com/joyent/node/blob/master/lib/events.js
// Copyright Joyent, Inc. and other Node contributors.

export function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

EventEmitter.defaultMaxListeners = 10;

EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n)) {
    throw TypeError('n must be a positive number');
  }
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var err, handler, len, args, i, listeners;

  if (!this._events) {
    this._events = {};
  }

  if (type === 'error') {
    if (!this._events.error || (isObject(this._events.error) && !this._events.error.length)) {
      err = arguments[1];
      if (err instanceof Error) {
        throw err;
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler)) {
    return false;
  }

  if (isFunction(handler)) {
    switch (arguments.length) {
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;

      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++) {
          args[i - 1] = arguments[i];
        }
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++) {
      listeners[i].apply(this, args);
    }
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m, check, text;

  if (!isFunction(listener)) {
    throw TypeError('listener must be a function');
  }

  if (!this._events) {
    this._events = {};
  }

  // Avoid recursion in the case that type === "newListener".
  // Before adding it to the listeners, first emit "newListener".
  if (this._events.newListener) {
    check = isFunction(listener.listener);
    this.emit('newListener', type, check ? listener.listener: listener);
  }

  if (!this._events[type]) {
    this._events[type] = listener;
  } else if (isObject(this._events[type])) {
    this._events[type].push(listener);
  } else {
    this._events[type] = [this._events[type], listener];
  }

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      text = 'Possible EventEmitter memory leak detected. %d listeners added.';
      console.error(text, this._events[type].length);
      if (typeof console.trace === 'function') {
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener)) {
    throw TypeError('listener must be a function');
  }

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener)) {
    throw TypeError('listener must be a function');
  }

  if (!this._events || !this._events[type]) {
    return this;
  }

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener) {
      this.emit('removeListener', type, listener);
    }

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0) {
      return this;
    }

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener) {
      this.emit('removeListener', type, listener);
    }
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events) {
    return this;
  }

  if (!this._events.removeListener) {
    if (arguments.length === 0) {
      this._events = {};
    }
    else if (this._events[type]) {
      delete this._events[type];
    }
    return this;
  }

  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') {
        continue;
      }
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    while (listeners.length) {
      this.removeListener(type, listeners[listeners.length - 1]);
    }
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type]) {
    ret = [];
  } else if (isFunction(this._events[type])) {
    ret = [this._events[type]];
  } else {
    ret = this._events[type].slice();
  }

  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type]) {
    ret = 0;
  } else if (isFunction(emitter._events[type])) {
    ret = 1;
  } else {
    ret = emitter._events[type].length;
  }

  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}
