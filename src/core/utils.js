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