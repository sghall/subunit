
export function remove() {
  var ns = this.namespace;
  return this.each("end.transition", function() {
    if (this[ns].count < 2 && this.parentNode) {
       this.parentNode.removeChild(this);
    }
  });
}
