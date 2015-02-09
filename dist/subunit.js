(function() {
    "use strict";
    function $$$methods$classed$$classed(name, value) {

      console.warn('selection.classed has been deprecated. Use selection.tagged.');

      if (arguments.length < 2) {

        if (typeof name === "string") {
          var node = this.node();
          var n = (name = $$$methods$classed$$selection_classes(name)).length;
          var i = -1;

          if (value = node.__tags__.length) {
            while (++i < n) {
              if (value.indexOf(name[i]) === -1) {
                 return false;
              }
            }
          }

          return true;
        }

        for (value in name) {
          this.each($$$methods$classed$$selection_classed(value, name[value]));
        }

        return this;
      }

      return this.each($$$methods$classed$$selection_classed(name, value));
    }

    function $$$methods$classed$$selection_classes(name) {
      return (name + "").trim().split(/^|\s+/);
    }

    function $$$methods$classed$$selection_classed(name, value) {
      name = $$$methods$classed$$selection_classes(name)
        .map($$$methods$classed$$selection_classedName);

      var n = name.length;

      function classedConstant() {
        var i = -1;
        while (++i < n) {
          name[i](this, value);
        }
      }

      function classedFunction() {
        var i = -1, x = value.apply(this, arguments);
        while (++i < n) {
          name[i](this, x);
        }
      }

      return typeof value === "function" ?
        classedFunction: 
        classedConstant;
    }

    function $$$methods$classed$$selection_classedName(name) {
      return function(node, value) {
        var index;

        if (node.__tags__) {
          index = node.__tags__.indexOf(name);
          if (value && index === -1) {
            return node.__tags__.push(name);
          } else if (index !== -1){
            return delete node.__tags__[index];
          }
        }

        return;
      };
    }function $$$methods$tagged$$tagged(name, value) {
      if (arguments.length < 2) {

        if (typeof name === "string") {
          var node = this.node();
          var n = (name = $$$methods$tagged$$selection_tags(name)).length;
          var i = -1;

          if (value = node.__tags__.length) {
            while (++i < n) {
              if (value.indexOf(name[i]) === -1) {
                 return false;
              }
            }
          }

          return true;
        }

        for (value in name) {
          this.each($$$methods$tagged$$selection_tagged(value, name[value]));
        }

        return this;
      }

      return this.each($$$methods$tagged$$selection_tagged(name, value));
    }


    function $$$methods$tagged$$selection_tags(name) {
      return (name + "").trim().split(/^|\s+/);
    }

    function $$$methods$tagged$$selection_tagged(name, value) {
      name = $$$methods$tagged$$selection_tags(name)
        .map($$$methods$tagged$$selection_taggedName);

      var n = name.length;

      function taggedConstant() {
        var i = -1;
        while (++i < n) {
          name[i](this, value);
        }
      }

      function taggedFunction() {
        var i = -1, x = value.apply(this, arguments);
        while (++i < n) {
          name[i](this, x);
        }
      }

      return typeof value === "function" ?
        taggedFunction: 
        taggedConstant;
    }

    function $$$methods$tagged$$selection_taggedName(name) {
      return function(node, value) {
        var index;

        if (node.__tags__) {
          index = node.__tags__.indexOf(name);
          if (value && index === -1) {
            return node.__tags__.push(name);
          } else if (index !== -1){
            return delete node.__tags__[index];
          }
        }

        return;
      };
    }function $$$methods$append$$append(name) {
      name = $$$methods$append$$_selection_creator(name);

      return this.select(function () {
        return name.apply(this, arguments);
      });
    }

    function $$$methods$append$$_selection_creator(name) {
      var func;

      if (typeof name === "function") {
        func = name; // SEND ANY CONSTRUCTOR
      } else if (name === "mesh") {
        func = THREE.Mesh;
      } else if (name === "line") {
        func = THREE.Line;
      } else if (name === "object") {
        func = THREE.Object3D;
      } else if (name === "g") {
        func = THREE.Object3D;
      } else {
        throw new Error("Cannot append: ", name);
      }

      return function (data) {
        var node = new func();
        node.__data__  = data;
        node.__tags__  = [];
        node.parentNode = this;
        this.add(node);
        return node;
      };
    }function $$$methods$empty$$empty() {
      return !this.node();
    }function $$$methods$node$$node() {
      for (var j = 0, m = this.length; j < m; j++) {
        for (var group = this[j], i = 0, n = group.length; i < n; i++) {
          var nodeGroup = group[i];
          if (nodeGroup) {
            return nodeGroup;
          }
        }
      }
      return null;
    }function $$core$utils$$search(node, selector) {
      var result = [], tagsArray;

      if (typeof selector === "string") {
        tagsArray = selector.replace(/\./g, " ").trim().split(" ");
      }

      var searchIterator = function (node) {

        if (typeof selector === "string") {

          if (!node.__data__) {
            return;
          }

          for (var i = 0; i < tagsArray.length; i++) {
            if (node.__tags__.indexOf(tagsArray[i]) < 0) {
              return;
            }
          }
        } else {
          for (var s in selector) {
            if (node[s] !== selector[s]) {
              return;
            }
          }
        }

        return result.push(node);
      };

      node.traverse(searchIterator);

      return result;
    }

    function $$core$utils$$array(list) { 
      return Array.prototype.slice.call(list); 
    }

    function $$core$utils$$ToObject(val) {
      if (val == null) {
        throw new TypeError('Object.assign cannot be called with null or undefined');
      }

      return Object(val);
    }

    function $$core$utils$$assign(target, source) {
      var pendingException;
      var from;
      var keys;
      var to = $$core$utils$$ToObject(target);

      if (!source) {
        throw new Error("No source(s) provided to assign.");
      }

      for (var s = 1; s < arguments.length; s++) {
        from = arguments[s];
        keys = Object.keys(Object(from));

        for (var i = 0; i < keys.length; i++) {
          try {
            to[keys[i]] = from[keys[i]];
          } catch (err) {
            if (pendingException === undefined) {
              pendingException = err;
            }
          }
        }
      }

      if (pendingException) {
        throw pendingException;
      }

      return to;
    }function $$$methods$call$$call(callback) {
      var args = $$core$utils$$array(arguments);
      callback.apply(args[0] = this, args);
      return this;
    }function $$$methods$use$$use(model, callback) {
      return $$$methods$use$$_selection_use(this, function(node, i, j) {
        callback.call(model, node.__data__, i, j);
      });
    }

    function $$$methods$use$$_selection_use(groups, callback) {
      for (var j = 0, m = groups.length; j < m; j++) {
        for (var group = groups[j], i = 0, n = group.length, node; i < n; i++) {
          if (node = group[i]) {
            callback(node, i, j);
          } 
        }
      }
      return groups;
    }

    var $$$core$extend_enter$$enterMethods = {};

    $$$core$extend_enter$$enterMethods.append = $$$methods$append$$append;
    $$$core$extend_enter$$enterMethods.empty  = $$$methods$empty$$empty;
    $$$core$extend_enter$$enterMethods.node   = $$$methods$node$$node;
    $$$core$extend_enter$$enterMethods.call   = $$$methods$call$$call;
    $$$core$extend_enter$$enterMethods.use    = $$$methods$use$$use;

    $$$core$extend_enter$$enterMethods.select = function(selector) {
      var subgroups = [], subgroup, upgroup, group;
      var subnode, node;

      for (var j = -1, m = this.length; ++j < m;) {
        upgroup = (group = this[j]).update;
        subgroups.push(subgroup = []);
        subgroup.parentNode = group.parentNode;
        for (var i = -1, n = group.length; ++i < n;) {
          if (node = group[i]) {
            subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i, j));
            subnode.__data__ = node.__data__;
          } else {
            subgroup.push(null);
          }
        }
      }
      return $$core$extend_selection$$extend_selection(subgroups);
    };

    function $$$core$extend_enter$$extend_enter(object) {
      for (var property in $$$core$extend_enter$$enterMethods) {
        object[property] = $$$core$extend_enter$$enterMethods[property];
      }
      return object;
    }function $$$methods$data$$data(value, key) {
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
          var nodeByKeyValue = new $$$methods$data$$Subunit_Map(),
              dataByKeyValue = new $$$methods$data$$Subunit_Map(),
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
              enterNodes[i] = $$$methods$data$$_selection_dataNode(nodeData);
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
              enterNodes[i] = $$$methods$data$$_selection_dataNode(nodeData);
            }
          }
          for (; i < m; ++i) {
            enterNodes[i] = $$$methods$data$$_selection_dataNode(groupData[i]);
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

      var enter  = $$$core$extend_enter$$extend_enter([]),
          update = $$core$extend_selection$$extend_selection([]),
          exit   = $$core$extend_selection$$extend_selection([]);

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

    function $$$methods$data$$subunit_class(ctor, properties) {
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

    var $$$methods$data$$subunit_map_prefix = "\0",
        $$$methods$data$$subunit_map_prefixCode = $$$methods$data$$subunit_map_prefix.charCodeAt(0);

    function $$$methods$data$$subunit_map_has(key) {
      return $$$methods$data$$subunit_map_prefix + key in this;
    }

    function $$$methods$data$$subunit_map_remove(key) {
      key = $$$methods$data$$subunit_map_prefix + key;
      return key in this && delete this[key];
    }

    function $$$methods$data$$subunit_map_keys() {
      var keys = [];
      this.forEach(function (key) { keys.push(key); });
      return keys;
    }

    function $$$methods$data$$subunit_map_size() {
      var size = 0;
      for (var key in this) {
         if (key.charCodeAt(0) === $$$methods$data$$subunit_map_prefixCode) {
           ++size;
         }
      }
      return size;
    }

    function $$$methods$data$$subunit_map_empty() {
      for (var key in this) {
        if (key.charCodeAt(0) === $$$methods$data$$subunit_map_prefixCode) {
          return false;
        }
      }
      return true;
    }

    function $$$methods$data$$Subunit_Map() {}

    $$$methods$data$$subunit_class($$$methods$data$$Subunit_Map, {
      has: $$$methods$data$$subunit_map_has,
      get: function(key) {
        return this[$$$methods$data$$subunit_map_prefix + key];
      },
      set: function(key, value) {
        return this[$$$methods$data$$subunit_map_prefix + key] = value;
      },
      remove: $$$methods$data$$subunit_map_remove,
      keys: $$$methods$data$$subunit_map_keys,
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
      size: $$$methods$data$$subunit_map_size,
      empty: $$$methods$data$$subunit_map_empty,
      forEach: function(f) {
        for (var key in this) {
          if (key.charCodeAt(0) === $$$methods$data$$subunit_map_prefixCode) {
            f.call(this, key.substring(1), this[key]);
          }
        } 
      }
    });

    function $$$methods$data$$_selection_dataNode(data) {
      var store = {};
      store.__data__ = data;
      store.__tags__ = [];
      return store;
    }function $$$methods$remove$$remove() {
      return this.each(function() {
        var parent = this.parentNode;
        if (parent) {
          parent.remove(this); 
        }
      });
    }function $$$methods$attr$$attr(name, value) {

      if (arguments.length < 2) {

        for (value in name) {
          this.each($$$methods$attr$$_selection_attr(value, name[value]));
        }
        return this;
      }
      return this.each($$$methods$attr$$_selection_attr(name, value));
    }

    function $$$methods$attr$$_selection_attr(name, value) {

      function attrNull() {
        delete this[name];
      }

      function attrConstant() {
        if (name === "tags" || name === "class") {
          var arr = value.split(" ");
          for (var i = 0; i < arr.length; i++) {
            this.__tags__.push(arr[i]);
          }
        } else {
          this[name] = value;
        }
      }

      function attrFunction() {
        var x = value.apply(this, arguments);
        if (x === null) {
          return this[name] && delete this[name];
        } else {
          this[name] = x;
        }
      }
      return value === null ? attrNull: (typeof value === "function" ? attrFunction: attrConstant);
    }function $$$methods$sort$$sort(comparator) {
      comparator = $$$methods$sort$$selection_sortComparator.apply(this, arguments);
      for (var j = -1, m = this.length; ++j < m;) {
        this[j].sort(comparator);
      }
      return this;
    }

    function $$$methods$sort$$selection_sortComparator(comparator) {
      if (!arguments.length) {
        comparator = $$$methods$sort$$ascending;
      }
      return function(a, b) {
        return a && b ? comparator(a.__data__, b.__data__) : !a - !b;
      };
    }

    function $$$methods$sort$$ascending(a, b) {
      return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
    }function $$$methods$filter$$filter(fun) {
      var subgroups = [], subgroup, group, node;

      if (typeof fun !== "function") {
        fun = $$$methods$filter$$_selection_filter(fun);
      } 

      for (var j = 0, m = this.length; j < m; j++) {
        subgroups.push(subgroup = []);
        subgroup.parentNode = (group = this[j]).parentNode;
        for (var i = 0, n = group.length; i < n; i++) {
          if ((node = group[i]) && fun.call(node, node.__data__, i, j)) {
            subgroup.push(node);
          }
        }
      }
      return $$core$extend_selection$$extend_selection(subgroups);
    }

    function $$$methods$filter$$_selection_filter(selector) {
      return function() {
        return $$core$utils$$search(this, selector, true);
      };
    }

    function $$$methods$datum$$datum(value) {
      return arguments.length ? this.prop("__data__", value) : this.prop("__data__");
    }
    function $$$methods$each$$each(callback) {
      return $$$methods$each$$_selection_each(this, function (node, i, j) {
        callback.call(node, node.__data__, i, j);
      });
    }

    function $$$methods$each$$_selection_each(groups, callback) {
      for (var j = 0, m = groups.length; j < m; j++) {
        for (var group = groups[j], i = 0, n = group.length, node; i < n; i++) {
          if (node = group[i]) {
            callback(node, i, j);
          } 
        }
      }
      return groups;
    }
    function $$$methods$on$$on(type, listener) {
      return this.each($$$methods$on$$selection_on(type, listener));
    }

    function $$$methods$on$$selection_on(type, listener) {

      function onRemove(d, i, j) { // NEEDS WORK
        this.removeEventListener(type, (function () {
          return function (event) {
            return listener.call(this, event, this.__data__, i, j);
          };
        }()));
      }

      function onAdd(d, i, j) {
        this.addEventListener(type, (function () {
          return function (event) {
            return listener.call(this, event, this.__data__, i, j);
          };
        }()));
      }

      return listener === null ? onRemove: onAdd;
    }function $$$methods$select$$select(selector) {
      var subgroups = [], subgroup, subnode, group, node;

      selector = $$$methods$select$$selection_selector(selector);

      for (var j = -1, m = this.length; ++j < m;) {
        subgroups.push(subgroup = []);
        subgroup.parentNode = (group = this[j]).parentNode;

        for (var i = -1, n = group.length; ++i < n;) {
          if (node = group[i]) {
            subgroup.push(subnode = selector.call(node, node.__data__, i, j));
            if (subnode && "__data__" in node) {
              subnode.__data__ = node.__data__;
            }
          } else {
            subgroup.push(null);
          }
        }
      }

      return $$core$extend_selection$$extend_selection(subgroups);
    }

    function $$$methods$select$$selection_selector(selector) {
      return typeof selector === "function" ? selector : function() {
        return $$core$utils$$search(this, selector);
      };
    }

    function $$$methods$selectAll$$selectAll(selector) {
      var subgroups = [], subgroup, node;

      selector = $$$methods$selectAll$$_selection_selectorAll(selector);

      for (var j = -1, m = this.length; ++j < m;) {
        for (var group = this[j], i = -1, n = group.length; ++i < n;) {
          if (node = group[i]) {
            subgroups.push(subgroup = $$core$utils$$array(selector.call(node, node.__data__, i, j)));
            subgroup.parentNode = node;
          }
        }
      }
      return $$core$extend_selection$$extend_selection(subgroups);
    }

    function $$$methods$selectAll$$_selection_selectorAll(selector) {
      return typeof selector === "function" ? selector : function() {
        return $$core$utils$$search(this, selector);
      };
    }

    var $$core$extend_selection$$selectionMethods = {};

    $$core$extend_selection$$selectionMethods.classed = $$$methods$classed$$classed;
    $$core$extend_selection$$selectionMethods.tagged  = $$$methods$tagged$$tagged;
    $$core$extend_selection$$selectionMethods.append  = $$$methods$append$$append;
    $$core$extend_selection$$selectionMethods.empty   = $$$methods$empty$$empty;
    $$core$extend_selection$$selectionMethods.node    = $$$methods$node$$node;
    $$core$extend_selection$$selectionMethods.call    = $$$methods$call$$call;
    $$core$extend_selection$$selectionMethods.data    = $$$methods$data$$data;
    $$core$extend_selection$$selectionMethods.remove  = $$$methods$remove$$remove;
    $$core$extend_selection$$selectionMethods.attr    = $$$methods$attr$$attr;
    $$core$extend_selection$$selectionMethods.sort    = $$$methods$sort$$sort;
    $$core$extend_selection$$selectionMethods.filter  = $$$methods$filter$$filter;
    $$core$extend_selection$$selectionMethods.datum   = $$$methods$datum$$datum;
    $$core$extend_selection$$selectionMethods.each    = $$$methods$each$$each;
    $$core$extend_selection$$selectionMethods.on      = $$$methods$on$$on;

    $$core$extend_selection$$selectionMethods.select    = $$$methods$select$$select;
    $$core$extend_selection$$selectionMethods.selectAll = $$$methods$selectAll$$selectAll;

    function $$core$extend_selection$$extend_selection(object) {
      for (var property in $$core$extend_selection$$selectionMethods) {
        object[property] = $$core$extend_selection$$selectionMethods[property];
      }
      return object;
    }// Adapted from http://facebook.github.io/flux/
    // BSD License
    // For Flux software
    // Copyright (c) 2014, Facebook, Inc. All rights reserved.

    var $$core$Dispatcher$$_lastID = 1;
    var $$core$Dispatcher$$_prefix = 'ID_';

    function $$core$Dispatcher$$Dispatcher() {
      this._Dispatcher_callbacks = {};
      this._Dispatcher_isPending = {};
      this._Dispatcher_isHandled = {};
      this._Dispatcher_isDispatching = false;
      this._Dispatcher_pendingPayload = null;
    }

    $$core$Dispatcher$$Dispatcher.prototype.register = function(callback) {
      var id = $$core$Dispatcher$$_prefix + $$core$Dispatcher$$_lastID++;
      this._Dispatcher_callbacks[id] = callback;
      return id;
    };

    $$core$Dispatcher$$Dispatcher.prototype.unregister = function(id) {
      if (!this._Dispatcher_callbacks[id]) {
        console.warn('Dispatcher.unregister: `%s` does not map to callback.', id);
      }

      delete this._Dispatcher_callbacks[id];
    };

    $$core$Dispatcher$$Dispatcher.prototype.waitFor = function(ids) {
      if (!this._Dispatcher_isDispatching) {
        console.warn('Dispatcher.waitFor: Must be invoked while dispatching.');
      }

      for (var ii = 0; ii < ids.length; ii++) {
        var id = ids[ii];
        if (this._Dispatcher_isPending[id]) {
          if (!this._Dispatcher_isHandled[id]) {
            console.warn('Dispatcher.waitFor: Circular dependency for `%s`.', id);
          }
          continue;
        }
        if (!this._Dispatcher_callbacks[id]) {
          console.warn('Dispatcher.waitFor: `%s` does not map to callback.', id);
        }
        this._Dispatcher_invokeCallback(id);
      }
    };

    $$core$Dispatcher$$Dispatcher.prototype.dispatch = function (payload) {
      if (this._Dispatcher_isDispatching) {
        console.warn('Dispatcher.dispatch: Cannot dispatch in the middle of a dispatch.');
      }
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

    $$core$Dispatcher$$Dispatcher.prototype.isDispatching = function() {
      return this._Dispatcher_isDispatching;
    };

    $$core$Dispatcher$$Dispatcher.prototype._Dispatcher_invokeCallback = function(id) {
      this._Dispatcher_isPending[id] = true;
      this._Dispatcher_callbacks[id](this._Dispatcher_pendingPayload);
      this._Dispatcher_isHandled[id] = true;
    };

    $$core$Dispatcher$$Dispatcher.prototype._Dispatcher_startDispatching = function(payload) {
      for (var id in this._Dispatcher_callbacks) {
        this._Dispatcher_isPending[id] = false;
        this._Dispatcher_isHandled[id] = false;
      }
      this._Dispatcher_pendingPayload = payload;
      this._Dispatcher_isDispatching = true;
    };

    $$core$Dispatcher$$Dispatcher.prototype._Dispatcher_stopDispatching = function() {
      this._Dispatcher_pendingPayload = null;
      this._Dispatcher_isDispatching = false;
    };
    function $$core$EventEmitter$$EventEmitter() {
      this._events = this._events || {};
      this._maxListeners = this._maxListeners || undefined;
    }

    $$core$EventEmitter$$EventEmitter.prototype._events = undefined;
    $$core$EventEmitter$$EventEmitter.prototype._maxListeners = undefined;

    $$core$EventEmitter$$EventEmitter.defaultMaxListeners = 10;

    $$core$EventEmitter$$EventEmitter.prototype.setMaxListeners = function(n) {
      if (!$$core$EventEmitter$$isNumber(n) || n < 0 || isNaN(n)) {
        throw TypeError('n must be a positive number');
      }
      this._maxListeners = n;
      return this;
    };

    $$core$EventEmitter$$EventEmitter.prototype.emit = function(type) {
      var err, handler, len, args, i, listeners;

      if (!this._events) {
        this._events = {};
      }

      if (type === 'error') {
        if (!this._events.error || ($$core$EventEmitter$$isObject(this._events.error) && !this._events.error.length)) {
          err = arguments[1];
          if (err instanceof Error) {
            throw err;
          }
          throw TypeError('Uncaught, unspecified "error" event.');
        }
      }

      handler = this._events[type];

      if ($$core$EventEmitter$$isUndefined(handler)) {
        return false;
      }

      if ($$core$EventEmitter$$isFunction(handler)) {
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
      } else if ($$core$EventEmitter$$isObject(handler)) {
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

    $$core$EventEmitter$$EventEmitter.prototype.addListener = function(type, listener) {
      var m, check, text;

      if (!$$core$EventEmitter$$isFunction(listener)) {
        throw TypeError('listener must be a function');
      }

      if (!this._events) {
        this._events = {};
      }

      // Avoid recursion in the case that type === "newListener".
      // Before adding it to the listeners, first emit "newListener".
      if (this._events.newListener) {
        check = $$core$EventEmitter$$isFunction(listener.listener);
        this.emit('newListener', type, check ? listener.listener: listener);
      }

      if (!this._events[type]) {
        this._events[type] = listener;
      } else if ($$core$EventEmitter$$isObject(this._events[type])) {
        this._events[type].push(listener);
      } else {
        this._events[type] = [this._events[type], listener];
      }

      // Check for listener leak
      if ($$core$EventEmitter$$isObject(this._events[type]) && !this._events[type].warned) {
        if (!$$core$EventEmitter$$isUndefined(this._maxListeners)) {
          m = this._maxListeners;
        } else {
          m = $$core$EventEmitter$$EventEmitter.defaultMaxListeners;
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

    $$core$EventEmitter$$EventEmitter.prototype.on = $$core$EventEmitter$$EventEmitter.prototype.addListener;

    $$core$EventEmitter$$EventEmitter.prototype.once = function(type, listener) {
      if (!$$core$EventEmitter$$isFunction(listener)) {
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

    $$core$EventEmitter$$EventEmitter.prototype.removeListener = function(type, listener) {
      var list, position, length, i;

      if (!$$core$EventEmitter$$isFunction(listener)) {
        throw TypeError('listener must be a function');
      }

      if (!this._events || !this._events[type]) {
        return this;
      }

      list = this._events[type];
      length = list.length;
      position = -1;

      if (list === listener ||
          ($$core$EventEmitter$$isFunction(list.listener) && list.listener === listener)) {
        delete this._events[type];
        if (this._events.removeListener) {
          this.emit('removeListener', type, listener);
        }

      } else if ($$core$EventEmitter$$isObject(list)) {
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

    $$core$EventEmitter$$EventEmitter.prototype.removeAllListeners = function(type) {
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

      if ($$core$EventEmitter$$isFunction(listeners)) {
        this.removeListener(type, listeners);
      } else {
        while (listeners.length) {
          this.removeListener(type, listeners[listeners.length - 1]);
        }
      }
      delete this._events[type];

      return this;
    };

    $$core$EventEmitter$$EventEmitter.prototype.listeners = function(type) {
      var ret;
      if (!this._events || !this._events[type]) {
        ret = [];
      } else if ($$core$EventEmitter$$isFunction(this._events[type])) {
        ret = [this._events[type]];
      } else {
        ret = this._events[type].slice();
      }

      return ret;
    };

    $$core$EventEmitter$$EventEmitter.listenerCount = function(emitter, type) {
      var ret;
      if (!emitter._events || !emitter._events[type]) {
        ret = 0;
      } else if ($$core$EventEmitter$$isFunction(emitter._events[type])) {
        ret = 1;
      } else {
        ret = emitter._events[type].length;
      }

      return ret;
    };

    function $$core$EventEmitter$$isFunction(arg) {
      return typeof arg === 'function';
    }

    function $$core$EventEmitter$$isNumber(arg) {
      return typeof arg === 'number';
    }

    function $$core$EventEmitter$$isObject(arg) {
      return typeof arg === 'object' && arg !== null;
    }

    function $$core$EventEmitter$$isUndefined(arg) {
      return arg === void 0;
    }
    // Adapted from https://github.com/isaacs/node-lru-cache

    function $$core$LRUCache$$hOP (obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }

    function $$core$LRUCache$$naiveLength () {
      return 1; 
    }

    function $$core$LRUCache$$LRUCache (options) {
      if (!(this instanceof $$core$LRUCache$$LRUCache)) {
        return new $$core$LRUCache$$LRUCache(options);
      }

      if (typeof options === 'number') {
        options = {max: options};
      }

      if (!options) {
        options = {};
      }

      this._max = options.max;

      if (!this._max || this._max <= 0) {
        this._max = Infinity;
      }

      this._lengthCalculator = options.length || $$core$LRUCache$$naiveLength;

      if (typeof this._lengthCalculator !== "function") {
        this._lengthCalculator = $$core$LRUCache$$naiveLength;
      }

      this._allowStale = options.stale || false;
      this._maxAge = options.maxAge || null;
      this._dispose = options.dispose;
      this.reset();
    }

    Object.defineProperty($$core$LRUCache$$LRUCache.prototype, "max", {
      set: function (mL) {
        if (!mL || mL <= 0) {
          mL = Infinity;
        }

        this._max = mL;

        if (this._length > this._max) {
          $$core$LRUCache$$trim(this);
        }
      },
      get: function () { 
        return this._max;
      },
      enumerable : true
    });

    Object.defineProperty($$core$LRUCache$$LRUCache.prototype, "lengthCalculator", {
      set: function (lC) {
        var key;

        if (typeof lC !== "function") {
          this._lengthCalculator = $$core$LRUCache$$naiveLength;
          this._length = this._itemCount;
          for (key in this._cache) {
            this._cache[key].length = 1;
          }
        } else {
          this._lengthCalculator = lC;
          this._length = 0;
          for (key in this._cache) {
            this._cache[key].length = this._lengthCalculator(this._cache[key].value);
            this._length += this._cache[key].length;
          }
        }

        if (this._length > this._max) {
          $$core$LRUCache$$trim(this);
        }
      },
      get: function () { 
        return this._lengthCalculator;
      },
      enumerable : true
    });

    Object.defineProperty($$core$LRUCache$$LRUCache.prototype, "length", {
      get: function () { 
        return this._length;
      },
      enumerable : true
    });


    Object.defineProperty($$core$LRUCache$$LRUCache.prototype, "itemCount", {
      get: function () { 
        return this._itemCount;
      },
      enumerable : true
    });

    $$core$LRUCache$$LRUCache.prototype.forEach = function (fn, thisp) {
      thisp = thisp || this;
      var i = 0, hit;

      for (var k = this._mru - 1; k >= 0 && i < this._itemCount; k--) {
        if (this._lruList[k]) {
          hit = this._lruList[k];
          i ++;
          if (this._maxAge && (Date.now() - hit.now > this._maxAge)) {
            $$core$LRUCache$$del(this, hit);
            if (!this._allowStale) {
              hit = undefined;
            }
          }
          if (hit) {
            fn.call(thisp, hit.value, hit.key, this);
          }
        }
      }
    };

    $$core$LRUCache$$LRUCache.prototype.keys = function () {
      var keys = new Array(this._itemCount);
      var i = 0, hit;

      for (var k = this._mru - 1; k >= 0 && i < this._itemCount; k--) {

        if (this._lruList[k]) {
          hit = this._lruList[k];
          keys[i++] = hit.key;
        }
      }

      return keys;
    };

    $$core$LRUCache$$LRUCache.prototype.values = function () {
      var values = new Array(this._itemCount);
      var i = 0, hit;

      for (var k = this._mru - 1; k >= 0 && i < this._itemCount; k--) {
        if (this._lruList[k]) {
          hit = this._lruList[k];
          values[i++] = hit.value;
        }
      }

      return values;
    };

    $$core$LRUCache$$LRUCache.prototype.reset = function () {
      if (this._dispose && this._cache) {
        for (var k in this._cache) {
          this._dispose(k, this._cache[k].value);
        }
      }

      this._cache = Object.create(null);   //items by key
      this._lruList = Object.create(null); // items in order (use recency)
      this._mru = 0;    // most recently used
      this._lru = 0;    // least recently used
      this._length = 0; // number of items
      this._itemCount = 0;
    };

    $$core$LRUCache$$LRUCache.prototype.dump = function () {
      return this._cache;
    };

    $$core$LRUCache$$LRUCache.prototype.dumpLru = function () {
      return this._lruList;
    };

    $$core$LRUCache$$LRUCache.prototype.set = function (key, value) {
      var len, age, hit;

      if ($$core$LRUCache$$hOP(this._cache, key)) {

        if (this._dispose) {
          this._dispose(key, this._cache[key].value);
        }
        if (this._maxAge) {
          this._cache[key].now = Date.now();
        }

        this._cache[key].value = value;
        this.get(key);

        return true;
      }

      len = this._lengthCalculator(value);
      age = this._maxAge ? Date.now() : 0;
      hit = new $$core$LRUCache$$Entry(key, value, this._mru++, len, age);

      // oversized objects fall out of cache
      if (hit.length > this._max) {
        if (this._dispose) {
          this._dispose(key, value);
        }

        return false;
      }

      this._length += hit.length;
      this._lruList[hit.lu] = this._cache[key] = hit;
      this._itemCount++;

      if (this._length > this._max) {
        $$core$LRUCache$$trim(this);
      }
      return true;
    };

    $$core$LRUCache$$LRUCache.prototype.has = function (key) {
      var hit = this._cache[key];

      if (!$$core$LRUCache$$hOP(this._cache, key)) {
        return false;
      }

      if (this._maxAge && (Date.now() - hit.now > this._maxAge)) {
        return false;
      }
      return true;
    };

    $$core$LRUCache$$LRUCache.prototype.get = function (key) {
      return $$core$LRUCache$$get(this, key, true);
    };

    $$core$LRUCache$$LRUCache.prototype.peek = function (key) {
      return $$core$LRUCache$$get(this, key, false);
    };

    $$core$LRUCache$$LRUCache.prototype.pop = function () {
      var hit = this._lruList[this._lru];
      $$core$LRUCache$$del(this, hit);
      return hit || null;
    };

    $$core$LRUCache$$LRUCache.prototype.del = function (key) {
      $$core$LRUCache$$del(this, this._cache[key]);
    };

    function $$core$LRUCache$$get(self, key, doUse) {
      var hit = self._cache[key];

      if (hit) {
        if (self._maxAge && (Date.now() - hit.now > self._maxAge)) {
          $$core$LRUCache$$del(self, hit);
          if (!self._allowStale) {
            hit = undefined;
          }
        } else {
          if (doUse) {
            $$core$LRUCache$$use(self, hit);
          }
        }
        if (hit) {
          hit = hit.value;
        }
      }

      return hit;
    }

    function $$core$LRUCache$$use(self, hit) {
      $$core$LRUCache$$shiftLU(self, hit);
      hit.lu = self._mru ++;
      self._lruList[hit.lu] = hit;
    }

    function $$core$LRUCache$$trim(self) {
      while (self._lru < self._mru && self._length > self._max) {
        $$core$LRUCache$$del(self, self._lruList[self._lru]);
      }
    }

    function $$core$LRUCache$$shiftLU(self, hit) {
      delete self._lruList[hit.lu];
      while (self._lru < self._mru && !self._lruList[self._lru]) {
        self._lru ++;
      }
    }

    function $$core$LRUCache$$del(self, hit) {
      if (hit) {
        if (self._dispose) {
          self._dispose(hit.key, hit.value);
        }
        self._length -= hit.length;
        self._itemCount --;
        delete self._cache[hit.key];
        $$core$LRUCache$$shiftLU(self, hit);
      }
    }

    function $$core$LRUCache$$Entry(key, value, lu, length, now) {
      this.key = key;
      this.value = value;
      this.lu = lu;
      this.length = length;
      this.now = now;
    }

    var src$index$$SubUnit = {};

    src$index$$SubUnit.select = function (object) {
      var node = typeof object === "function" ? object(): object;
      var root = $$core$extend_selection$$extend_selection([[new THREE.Object3D()]]);
      root.parentNode = node;
      root[0][0].__data__ = {};
      root[0][0].__tags__ = [];
      node.add(root[0][0]);
      return root;
    };

    src$index$$SubUnit.object = function (object) {
      return $$core$extend_selection$$extend_selection([[object]]);
    };

    src$index$$SubUnit.createDispatcher = function () {

      var dispatcher = new $$core$Dispatcher$$Dispatcher();

      dispatcher.serverAction = function (action) {
        var payload = {
          source: 'SERVER_ACTION',
          action: action
        };
        this.dispatch(payload);
      };

      dispatcher.viewAction = function (action) {
        var payload = {
          source: 'VIEW_ACTION',
          action: action
        };
        this.dispatch(payload);
      };

      return dispatcher;
    };

    src$index$$SubUnit.createStore = function (methods) {
      var store = $$core$utils$$assign({}, $$core$EventEmitter$$EventEmitter.prototype, methods);

      store.emitChange = function() {
        this.emit('change');
      };

      store.addChangeListener = function (callback) {
        this.on('change', callback);
      };

      store.removeChangeListener = function(callback) {
        this.removeListener('change', callback);
      };

      return store;
    };

    function src$index$$SubUnitView (parent) {
      this.state = {};

      var node = new THREE.Object3D();
      this.parentNode = parent;
      this.parentNode.add(node);

      this.root = src$index$$SubUnit.object(node);
      this.events = {};
    }

    src$index$$SubUnitView.prototype.render = function () {};

    src$index$$SubUnitView.prototype.setState = function (data) {
      this.state = data;

      var render = this.render.bind(this);
      setTimeout(render, 0);
    };

    src$index$$SubUnitView.prototype.remove = function () {
      if (this.viewWillUnmount && typeof this.viewWillUnmount === 'function') {
        this.viewWillUnmount();
      }
      this.parentNode.remove(this.root.node());
    };

    src$index$$SubUnit.createView = function (parent, methods) {

      var view = $$core$utils$$assign(new src$index$$SubUnitView(parent), methods);

      if (view.getInitialState || typeof view.getInitialState === 'function') {
        view.setState(view.getInitialState());
      }

      if (view.viewDidMount && typeof view.viewDidMount === 'function') {
        view.viewDidMount();
      }

      if (!view.render || typeof view.render !== 'function') {
        console.warn('SubUnit view must have a render method');
      } else {
        view.render();
      }

      return view;
    };

    // adapted from memoize.js by @philogb and @addyosmani
    src$index$$SubUnit.cache = function (max, fn) {
      if (!fn) {
        throw new Error("SubUnit.cache: max and function are required (max, fn)");
      }

      return function () {
        var args = Array.prototype.slice.call(arguments);

        var key = "", len = args.length, cur = null, entry;

        while (len--) {
          cur = args[len];
          key += (cur === Object(cur))? JSON.stringify(cur): cur;

          if (!fn.lrucache) {
            fn.lrucache = new $$core$LRUCache$$LRUCache({max: max});
          }
        }

        if (entry = fn.lrucache.get(key)) {
          return entry;
        }

        entry = fn.apply(this, args);
        fn.lrucache.set(key, entry);

        return entry;
      };
    };

    src$index$$SubUnit.lru = function (max) {
      max = max || 0;

      return new $$core$LRUCache$$LRUCache({max: max});
    };

    // adapted from memoize.js by @philogb and @addyosmani
    src$index$$SubUnit.memoize = function (fn) {
      return function () {
        var args = Array.prototype.slice.call(arguments);

        var key = "", len = args.length, cur = null;

        while (len--) {
          cur = args[len];
          key += (cur === Object(cur))? JSON.stringify(cur): cur;

          if (!fn.memoize) {
            fn.memoize = {};
          }
        }

        return (key in fn.memoize)? fn.memoize[key]:
        fn.memoize[key] = fn.apply(this, args);
      };
    };

    if (typeof define === "function" && define.amd) {
      define(this.SubUnit = src$index$$SubUnit); 
    }
    else if (typeof module === "object" && module.exports) {
      module.exports = src$index$$SubUnit; 
    }
    else {
     this.SubUnit = src$index$$SubUnit;
    }
}).call(this);

//# sourceMappingURL=subunit.js.map