
export default function remove() {
  return this.each(function selectionRemove() {
    const parent = this.parentNode;
    if (parent) {
      parent.remove(this);
    }
  });
}
