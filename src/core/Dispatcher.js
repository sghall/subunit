// Adapted from http://facebook.github.io/flux/
// BSD License
// For Flux software
// Copyright (c) 2014, Facebook, Inc. All rights reserved.

var _lastID = 1;
var _prefix = 'ID_';

export function Dispatcher() {
  this._Dispatcher_callbacks = {};
  this._Dispatcher_isPending = {};
  this._Dispatcher_isHandled = {};
  this._Dispatcher_isDispatching = false;
  this._Dispatcher_pendingPayload = null;
}

Dispatcher.prototype.register=function(callback) {
  var id = _prefix + _lastID++;
  this._Dispatcher_callbacks[id] = callback;
  return id;
};

Dispatcher.prototype.unregister=function(id) {
  invariant(
    this._Dispatcher_callbacks[id],
    'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
    id
  );
  delete this._Dispatcher_callbacks[id];
};

Dispatcher.prototype.waitFor=function(ids) {
  invariant(
    this._Dispatcher_isDispatching,
    'Dispatcher.waitFor(...): Must be invoked while dispatching.'
  );
  for (var ii = 0; ii < ids.length; ii++) {
    var id = ids[ii];
    if (this._Dispatcher_isPending[id]) {
      invariant(
        this._Dispatcher_isHandled[id],
        'Dispatcher.waitFor(...): Circular dependency detected while ' +
        'waiting for `%s`.',
        id
      );
      continue;
    }
    invariant(
      this._Dispatcher_callbacks[id],
      'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
      id
    );
    this._Dispatcher_invokeCallback(id);
  }
};

Dispatcher.prototype.dispatch=function(payload) {
  invariant(
    !this._Dispatcher_isDispatching,
    'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
  );
  this._Dispatcher_startDispatching(payload);
  try {
    for (var id in this._Dispatcher_callbacks) {
      if (this._Dispatcher_isPending[id]) {
        continue;
      }
      this._Dispatcher_invokeCallback(id);
    }
  } finally {
    this._Dispatcher_stopDispatching();
  }
};

Dispatcher.prototype.isDispatching=function() {
  return this._Dispatcher_isDispatching;
};

Dispatcher.prototype._Dispatcher_invokeCallback=function(id) {
  this._Dispatcher_isPending[id] = true;
  this._Dispatcher_callbacks[id](this._Dispatcher_pendingPayload);
  this._Dispatcher_isHandled[id] = true;
};

Dispatcher.prototype._Dispatcher_startDispatching=function(payload) {
  for (var id in this._Dispatcher_callbacks) {
    this._Dispatcher_isPending[id] = false;
    this._Dispatcher_isHandled[id] = false;
  }
  this._Dispatcher_pendingPayload = payload;
  this._Dispatcher_isDispatching = true;
};

Dispatcher.prototype._Dispatcher_stopDispatching=function() {
  this._Dispatcher_pendingPayload = null;
  this._Dispatcher_isDispatching = false;
};

function invariant(condition, format, a, b, c, d, e, f) {
  if (false) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}