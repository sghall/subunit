import { extend_selection } from "../core/extend_selection";
import { extend_enter } from "../core/extend_enter";

export function data(value, key) {
  var i = -1, n = this.length, group, node;

  if (!arguments.length) {
    value = new Array(n = (group = this[0]).length);
    while (++i < n) {
      if (node = group[i]) {
        value[i] = node.__data__;
      }
    }
    return value;
  }

  function bind(group, groupData) {
    var i,
        n = group.length,
        m = groupData.length,
        n0 = Math.min(n, m),
        updateNodes = new Array(m),
        enterNodes  = new Array(m),
        exitNodes   = new Array(n),
        node,
        nodeData;

    if (key) {
      var nodeByKeyValue = new Che_Map(),
          dataByKeyValue = new Che_Map(),
          keyValues = [], keyValue;

      for (i = -1; ++i < n;) {
        keyValue = key.call(node = group[i], node.__data__, i);
        if (nodeByKeyValue.has(keyValue)) {
          exitNodes[i] = node; // duplicate selection key
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
        keyValues.push(keyValue);
      }

      for (i = -1; ++i < m;) {
        keyValue = key.call(groupData, nodeData = groupData[i], i);
        if (node = nodeByKeyValue.get(keyValue)) {
          updateNodes[i] = node;
          node.__data__ = nodeData;
        } else if (!dataByKeyValue.has(keyValue)) { // no duplicate data key
          enterNodes[i] = _selection_dataNode(nodeData);
        }
        dataByKeyValue.set(keyValue, nodeData);
        nodeByKeyValue.remove(keyValue);
      }

      for (i = -1; ++i < n;) {
        if (nodeByKeyValue.has(keyValues[i])) {
          exitNodes[i] = group[i];
        }
      }
    } else {
      for (i = -1; ++i < n0;) {
        node = group[i];
        nodeData = groupData[i];
        if (node) {
          node.__data__ = nodeData;
          updateNodes[i] = node;
        } else {
          enterNodes[i] = _selection_dataNode(nodeData);
        }
      }
      for (; i < m; ++i) {
        enterNodes[i] = _selection_dataNode(groupData[i]);
      }
      for (; i < n; ++i) {
        exitNodes[i] = group[i];
      }
    }

    enterNodes.update = updateNodes;

    enterNodes.parentNode = updateNodes.parentNode = exitNodes.parentNode = group.parentNode;

    enter.push(enterNodes);
    update.push(updateNodes);
    exit.push(exitNodes);
  }

  var enter  = extend_enter([]),
      update = extend_selection([]),
      exit   = extend_selection([]);

  if (typeof value === "function") {
    while (++i < n) {
      bind(group = this[i], value.call(group, group.parentNode.__data__, i));
    }
  } else {
    while (++i < n) {
      bind(group = this[i], value);
    }
  }

  update.enter = function() { return enter; };
  update.exit  = function() { return exit; };
  return update;
}

function subunit_class(ctor, properties) {
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

var subunit_map_prefix = "\0",
    subunit_map_prefixCode = subunit_map_prefix.charCodeAt(0);

function subunit_map_has(key) {
  return subunit_map_prefix + key in this;
}

function subunit_map_remove(key) {
  key = subunit_map_prefix + key;
  return key in this && delete this[key];
}

function subunit_map_keys() {
  var keys = [];
  this.forEach(function (key) { keys.push(key); });
  return keys;
}

function subunit_map_size() {
  var size = 0;
  for (var key in this) {
     if (key.charCodeAt(0) === subunit_map_prefixCode) {
       ++size;
     }
  }
  return size;
}

function subunit_map_empty() {
  for (var key in this) {
    if (key.charCodeAt(0) === subunit_map_prefixCode) {
      return false;
    }
  }
  return true;
}

function Che_Map() {}

subunit_class(Che_Map, {
  has: subunit_map_has,
  get: function(key) {
    return this[subunit_map_prefix + key];
  },
  set: function(key, value) {
    return this[subunit_map_prefix + key] = value;
  },
  remove: subunit_map_remove,
  keys: subunit_map_keys,
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
  size: subunit_map_size,
  empty: subunit_map_empty,
  forEach: function(f) {
    for (var key in this) {
      if (key.charCodeAt(0) === subunit_map_prefixCode) {
        f.call(this, key.substring(1), this[key]);
      }
    } 
  }
});

function _selection_dataNode(data) {
  var store = {};
  store.__data__  = data;
  store.__class__ = [];
  return store;
}