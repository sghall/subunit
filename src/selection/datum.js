
export function datum(value) {
  return arguments.length ? this.prop("__data__", value) : this.prop("__data__");
}
