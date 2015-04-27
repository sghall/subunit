
export function pass(callback) {
  var args = array(arguments);
  callback.apply(args[0] = this, args);
  return this;
}

function array(list) {
  return Array.prototype.slice.call(list);
}
