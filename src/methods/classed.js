
export function classed(name, value) {
  if (arguments.length < 2) {

    if (typeof name === "string") {
      var node = this.node(),
          n = (name = selection_classes(name)).length,
          i = -1;
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
      this.each(selection_classed(value, name[value]));
    }

    return this;
  }

  return this.each(selection_classed(name, value));
}

// var requote_regEx = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;

// function requote(s) {
//   return s.replace(requote_regEx, "\\$&");
// }

// function selection_classedRegEx(name) {
//   return new RegExp("(?:^|\\s+)" + requote(name) + "(?:\\s+|$)", "g");
// }

function selection_classes(name) {
  return (name + "").trim().split(/^|\s+/);
}

function selection_classed(name, value) {
  name = selection_classes(name)
    .map(selection_classedName);

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

function selection_classedName(name) {
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
}