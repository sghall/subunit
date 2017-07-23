
function attrTween(name, value) {
  function tween() {
    var i = value.apply(this, arguments);

    return i && function(t) {
      i(t);
    };
  }
  tween._value = value;
  return tween;
}

export default function(name, value) {
  return this.tween('attr.' + name, attrTween(name, value));
}
