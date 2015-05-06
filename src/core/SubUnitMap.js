
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

var mapPrefix = "\0";
var mapPrefixCode = mapPrefix.charCodeAt(0);

function mapHas(key) {
  return mapPrefix + key in this;
}

function mapRemove(key) {
  key = mapPrefix + key;
  return key in this && delete this[key];
}

function mapKeys() {
  var keys = [];
  this.forEach(function (key) { keys.push(key); });
  return keys;
}

function mapSize() {
  var size = 0;
  for (var key in this) {
     if (key.charCodeAt(0) === mapPrefixCode) {
       ++size;
     }
  }
  return size;
}

function mapEmpty() {
  for (var key in this) {
    if (key.charCodeAt(0) === mapPrefixCode) {
      return false;
    }
  }
  return true;
}

export function SubUnitMap() {}

defineProperties(SubUnitMap, {
  has: mapHas,
  get: function(key) {
    return this[mapPrefix + key];
  },
  set: function(key, value) {
    this[mapPrefix + key] = value;
    return value;
  },
  remove: mapRemove,
  keys: mapKeys,
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
  size: mapSize,
  empty: mapEmpty,
  forEach: function(f) {
    for (var key in this) {
      if (key.charCodeAt(0) === mapPrefixCode) {
        f.call(this, key.substring(1), this[key]);
      }
    }
  }
});
