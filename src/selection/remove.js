export function remove() {
  return this.each(function() {
    var parent = this.parentNode;
    if (parent) {
      parent.remove(this);
    }
  });
}
