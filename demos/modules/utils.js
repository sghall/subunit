export function memoize(fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments);

    var key = "", len = args.length, cur = null;

    while (len--) {
      cur = args[i];
      key += (cur === Object(cur)) ? JSON.stringify(cur): cur;

      fn.memoize || (fn.memoize = {});
    }

    return (key in fn.memoize) ? fn.memoize[key]:
    fn.memoize[key] = fn.apply(this, args);
  };
}