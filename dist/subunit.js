(function() {
    "use strict";
    function $$$methods$classed$$classed(name, value) {
      if (arguments.length < 2) {

        if (typeof name === "string") {
          var node = this.node();
          var n = (name = $$$methods$classed$$selection_classes(name)).length;
          var i = -1;

          if (value = node.__class__.length) {
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

    // var requote_regEx = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;

    // function requote(s) {
    //   return s.replace(requote_regEx, "\\$&");
    // }

    // function selection_classedRegEx(name) {
    //   return new RegExp("(?:^|\\s+)" + requote(name) + "(?:\\s+|$)", "g");
    // }

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

        if (node.__class__) {
          index = node.__class__.indexOf(name);
          if (value && index === -1) {
            return node.__class__.push(name);
          } else if (index !== -1){
            return delete node.__class__[index];
          }
        }

        return;
      };
    }function $$$methods$append$$append (name) {
      name = $$$methods$append$$_selection_creator(name);

      return this.select(function() {
        return name.apply(this, arguments);
      });
    }

    function $$$methods$append$$_selection_creator(name) {
      if (typeof name === "function") {
        return name;
      } else if (name === "mesh") {
        return function (data) { 
          var node = new THREE.Mesh();
          node.__data__ = data;
          node.__class__ = [];
          node.parentNode = this;
          this.add(node);
          return node;
        };
      } else if (name === "g") {
        return function (data) { 
          var node = new THREE.Object3D();
          node.__data__ = data;
          node.__class__ = [];
          node.parentNode = this;
          this.add(node);
          return node;
        };
      } else {
        throw new Error("The append method accepts 'mesh' or 'g' only");
      }
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
    }function $$$core$utils$$search(node, selector) {
      var result = [], classArray;

      if (typeof selector === "string") {
        classArray = selector.replace(/\./g, " ").trim().split(" ");
      }

      var searchIterator = function (node) {

        if (typeof selector === "string") {

          if (!node.__data__) {
            return;
          }

          for (var i = 0; i < classArray.length; i++) {
            if (node.__class__.indexOf(classArray[i]) < 0) {
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

    function $$$core$utils$$array(list) { 
      return Array.prototype.slice.call(list); 
    }function $$$methods$call$$call(callback) {
      var args = $$$core$utils$$array(arguments);
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
      store.__data__  = data;
      store.__class__ = [];
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
        if (name === "class") {
          var arr = value.split(" ");
          for (var i = 0; i < arr.length; i++) {
            this.__class__.push(arr[i]);
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
        return $$$core$utils$$search(this, selector, true);
      };
    }

    function $$$methods$datum$$datum(value) {
      return arguments.length ? this.prop("__data__", value) : this.prop("__data__");
    }
    function $$$methods$each$$each(callback) {
      return $$$methods$each$$_selection_each(this, function(node, i, j) {
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

      var wrapped = function () {
        return function (event) {
          return listener.call(this, event, this.__data__);
        };
      };

      function onRemove() {
        this.removeEventListener(type, wrapped());
      }

      function onAdd() {
        this.addEventListener(type, wrapped());
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
        return $$$core$utils$$search(this, selector);
      };
    }

    function $$$methods$selectAll$$selectAll(selector) {
      var subgroups = [], subgroup, node;

      selector = $$$methods$selectAll$$_selection_selectorAll(selector);

      for (var j = -1, m = this.length; ++j < m;) {
        for (var group = this[j], i = -1, n = group.length; ++i < n;) {
          if (node = group[i]) {
            subgroups.push(subgroup = $$$core$utils$$array(selector.call(node, node.__data__, i, j)));
            subgroup.parentNode = node;
          }
        }
      }
      return $$core$extend_selection$$extend_selection(subgroups);
    }

    function $$$methods$selectAll$$_selection_selectorAll(selector) {
      return typeof selector === "function" ? selector : function() {
        return $$$core$utils$$search(this, selector);
      };
    }

    var $$core$extend_selection$$selectionMethods = {};

    $$core$extend_selection$$selectionMethods.classed = $$$methods$classed$$classed;
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
    }

    var src$index$$SubUnit = {};

    if ( typeof module === 'object' ) {
      module.exports = src$index$$SubUnit;
    }

    src$index$$SubUnit.select = function (object) {
      var node = typeof object === "function" ? object(): object;
      var root = $$core$extend_selection$$extend_selection([[new THREE.Object3D()]]);
      root.parentNode = node;
      root[0][0].__data__  = {};
      root[0][0].__class__ = [];
      node.add(root[0][0]);
      return root;
    };

    src$index$$SubUnit.object = function (object) {
      return $$core$extend_selection$$extend_selection([[object]]);
    };

    this.SubUnit = src$index$$SubUnit;
}).call(this);

//# sourceMappingURL=subunit.js.map