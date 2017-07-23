import attr from './transition/attr';
import tween from './transition/tween';
import attrTween from './transition/attrTween';
import delay from 'd3-transition/src/transition/delay';
import duration from 'd3-transition/src/transition/duration';
import ease from 'd3-transition/src/transition/ease';
import on from 'd3-transition/src/transition/on';
import call from 'd3-selection/src/selection/call';
import nodes from 'd3-selection/src/selection/nodes';
import node from 'd3-selection/src/selection/node';
import size from 'd3-selection/src/selection/size';
import empty from 'd3-selection/src/selection/empty';
import each from 'd3-selection/src/selection/each';

var id = 0;

export function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}

export function newId() {
  return ++id;
}

Transition.prototype = {
  constructor: Transition,
  call,
  nodes,
  node,
  size,
  empty,
  each,
  attr,
  tween,
  attrTween,
  delay,
  duration,
  ease,
  on,
};