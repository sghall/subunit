import sparse from 'd3-selection/src/selection/sparse';
import Selection from '../Selection';

export default function() {
  return new Selection(this._enter || this._groups.map(sparse), this._parents);
}

export function EnterNode(parent, datum) {
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  add: function(child) { return this._parent.add(child); },
};
