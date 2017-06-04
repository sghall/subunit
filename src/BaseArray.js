import empty from 'd3-selection/src/selection/empty';
import node from 'd3-selection/src/selection/node';
import call from 'd3-selection/src/selection/call';
import use from './common/use';

export default class BaseArray extends Array {
  constructor(input) {
    super(input);
  }
}

BaseArray.prototype.empty = empty;
BaseArray.prototype.node = node;
BaseArray.prototype.call = call;
BaseArray.prototype.use = use;