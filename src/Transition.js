// import { selection } from 'd3-selection';
// import attr from '../transition/attr';
import delay from 'd3-transition/src/transition/delay';
import duration from 'd3-transition/src/transition/duration';
import ease from 'd3-transition/src/transition/ease';
import call from 'd3-selection/src/selection/call';
import nodes from 'd3-selection/src/selection/nodes';
import node from 'd3-selection/src/selection/node';
import size from 'd3-selection/src/selection/size';
import empty from 'd3-selection/src/selection/empty';
import each from 'd3-selection/src/selection/each';

// import transition_on from './on';
// import transition_remove from './remove';


let id = 0;

export function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}

// export default function transition(name) {
//   return selection().transition(name);
// }

export function newId() {
  return ++id;
}

// var selection_prototype = selection.prototype;

Transition.prototype = {
  constructor: Transition,
  call,
  nodes,
  node,
  size,
  empty,
  each,
  // on: transition_on,
  // attr,
  delay,
  duration,
  ease,
};