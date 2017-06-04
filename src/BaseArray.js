import { empty } from './common/empty';
import { node } from './common/node';
import { call } from './common/call';
import { use } from './common/use';

export default class BaseArray extends Array {
  constructor(input) {
    super(input);
  }
}

BaseArray.prototype.empty = empty;
BaseArray.prototype.node = node;
BaseArray.prototype.call = call;
BaseArray.prototype.use = use;