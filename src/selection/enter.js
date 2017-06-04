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
  // appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  // insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  // querySelector: function(selector) { return this._parent.querySelector(selector); },
  // querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};
