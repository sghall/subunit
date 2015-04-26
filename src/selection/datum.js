export function datum(value) {
	console.log("datum", typeof value, this);
  return arguments.length ? this.prop("__data__", value) : this.prop("__data__");
}
