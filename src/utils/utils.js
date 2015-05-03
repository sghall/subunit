export function search(node, selector) {
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

export function array(list) {
  return Array.prototype.slice.call(list);
}

function toObject(val) {
  if (val === null) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

export function assign(target, source) {
  var pendingException;
  var from;
  var keys;
  var to = toObject(target);

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
}
