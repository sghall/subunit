import { array } from "../core/utils";

export function call(callback) {
  var args = array(arguments);
  callback.apply(args[0] = this, args);
  return this;
}