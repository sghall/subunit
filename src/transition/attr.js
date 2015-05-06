import d3 from 'd3';
import { tween } from './tween';

export function attr(nameNS, value) {
  if (arguments.length < 2) {
    for (value in nameNS) this.attr(value, nameNS[value]);
    return this;
  }

  var interpolate = nameNS === "transform" ? d3.interpolateTransform : d3.interpolate;
  var name = d3.ns.qualify(nameNS);

  function attrNull() {
    this.removeAttribute(name);
  }

  function attrNullNS() {
    this.removeAttributeNS(name.space, name.local);
  }

  function attrTween(b) {
    return b == null ? attrNull : (b += "", function() {
      var a = this.getAttribute(name), i;
      return a !== b && (i = interpolate(a, b), function(t) { this.setAttribute(name, i(t)); });
    });
  }

  function attrTweenNS(b) {
    return b == null ? attrNullNS : (b += "", function() {
      var a = this.getAttributeNS(name.space, name.local), i;
      return a !== b && (i = interpolate(a, b), function(t) { this.setAttributeNS(name.space, name.local, i(t)); });
    });
  }

  return tween(this, "attr." + nameNS, value, name.local ? attrTweenNS : attrTween);
}
