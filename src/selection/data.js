import Selection from '../Selection';
import { EnterNode } from './enter';
import constant from 'd3-selection/src/constant';

const keyPrefix = '$';

function bindIndex(parent, group, enter, update, exit, data) {
  const groupLength = group.length;
  const dataLength = data.length;

  let i = 0;
  let node;

  for (; i < dataLength; ++i) {
    if ((node = group[i])) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  for (; i < groupLength; ++i) {
    if ((node = group[i])) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  const nodeByKeyValue = {};
  const groupLength = group.length;
  const dataLength = data.length;
  const keyValues = new Array(groupLength);
  
  let i;
  let node;
  let keyValue;

  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i])) {
      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
      if (keyValue in nodeByKeyValue) {
        exit[i] = node;
      } else {
        nodeByKeyValue[keyValue] = node;
      }
    }
  }

  for (i = 0; i < dataLength; ++i) {
    keyValue = keyPrefix + key.call(parent, data[i], i, data);
    if ((node = nodeByKeyValue[keyValue])) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue[keyValue] = null;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
      exit[i] = node;
    }
  }
}

export default function(value, key) {
  if (!value) {
    const data = new Array(this.size());

    let j = -1;

    this.each(function(d) { data[++j] = d; });

    return data;
  }

  const bind = key ? bindKey : bindIndex;
  const parents = this._parents;
  const groups = this._groups;

  if (typeof value !== 'function') value = constant(value);

  const m = groups.length;
  const enter = new Array(m);
  const update = new Array(m);
  const exit = new Array(m);

  for (let j = 0; j < m; ++j) {
    const parent = parents[j];
    const group = groups[j];
    const groupLength = group.length;
    const data = value.call(parent, parent && parent.__data__, j, parents);
    
    const dataLength = data.length;
    
    const enterGroup = enter[j] = new Array(dataLength);
    const updateGroup = update[j] = new Array(dataLength);
    const exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    for (let i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if ((previous = enterGroup[i0])) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  const updateSelection = new Selection(update, parents);
  updateSelection._enter = enter;
  updateSelection._exit = exit;
  return updateSelection;
}