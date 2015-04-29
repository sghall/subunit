
function defineProperties(ctor, properties) {
  try {
    for (var key in properties) {
      Object.defineProperty(ctor.prototype, key, {
        value: properties[key],
        enumerable: false
      });
    }
  } catch (e) {
    ctor.prototype = properties;
  }
}

var subunitMapPrefix = "\0";
var subunitMapPrefixCode = subunitMapPrefix.charCodeAt(0);

function subunitMapHas(key) {
  return subunitMapPrefix + key in this;
}

function subunitMapRemove(key) {
  key = subunitMapPrefix + key;
  return key in this && delete this[key];
}

function subunitMapKeys() {
  var keys = [];
  this.forEach(function (key) { keys.push(key); });
  return keys;
}

function subunitMapSize() {
  var size = 0;
  for (var key in this) {
     if (key.charCodeAt(0) === subunitMapPrefixCode) {
       ++size;
     }
  }
  return size;
}

function subunitMapEmpty() {
  for (var key in this) {
    if (key.charCodeAt(0) === subunitMapPrefixCode) {
      return false;
    }
  }
  return true;
}

export function SubunitMap() {}

defineProperties(SubunitMap, {
  has: subunitMapHas,
  get: function(key) {
    return this[subunitMapPrefix + key];
  },
  set: function(key, value) {
    this[subunitMapPrefix + key] = value;
    return value;
  },
  remove: subunitMapRemove,
  keys: subunitMapKeys,
  values: function() {
    var values = [];
    this.forEach(function (key, value) { values.push(value); });
    return values;
  },
  entries: function() {
    var entries = [];
    this.forEach(function (key, value) { entries.push({key: key, value: value}); });
    return entries;
  },
  size: subunitMapSize,
  empty: subunitMapEmpty,
  forEach: function(f) {
    for (var key in this) {
      if (key.charCodeAt(0) === subunitMapPrefixCode) {
        f.call(this, key.substring(1), this[key]);
      }
    }
  }
});
