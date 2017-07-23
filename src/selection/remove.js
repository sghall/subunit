
export default function remove() {
  return this.each(function selectionRemove() {
    var parent = this.parentNode;
    if (parent) {
      parent.remove(this);
    }
  });
}
