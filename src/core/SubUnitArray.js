export class SubUnitArray extends Array {
  constructor() {
    super();
  }

  call(callback) {
    var args = array(arguments);
    callback.apply(args[0] = this, args);
    return this;
  }

  empty() {
   return !this.node();
 }

}

export function array(list) {
  return Array.prototype.slice.call(list);
}
