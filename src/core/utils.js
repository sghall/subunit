export function search(node, selector) {
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

  for (var i = 0; i < node.children.length; i++) {
    node.children[i].traverse(searchIterator);
  }

  return result;
}

export function array(list) { 
  return Array.prototype.slice.call(list); 
}