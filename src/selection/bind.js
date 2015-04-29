import { SubUnitMap } from '../core/SubUnitMap';

export function getBind(enter, update, exit, key) {
  return function (group, groupData) {
    var i, node, nodeData;
    var n = group.length;
    var m = groupData.length;
    var n0 = Math.min(n, m);

    var updateNodes = new Array(m);
    var enterNodes = new Array(m);
    var exitNodes = new Array(n);

    if (key) {
      var nodeByKeyValue = new SubUnitMap();
      var dataByKeyValue = new SubUnitMap();
      var keyValues = [], keyValue;

      for (i = -1; ++i < n; ) {
        keyValue = key.call(node = group[i], node.__data__, i);
        if (nodeByKeyValue.has(keyValue)) {
          exitNodes[i] = node; // duplicate selection key
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
        keyValues.push(keyValue);
      }

      for (i = -1; ++i < m; ) {
        keyValue = key.call(groupData, nodeData = groupData[i], i);
        if (node = nodeByKeyValue.get(keyValue)) {
          updateNodes[i] = node;
          node.__data__ = nodeData;
        } else if (!dataByKeyValue.has(keyValue)) { // no duplicate data key
          enterNodes[i] = selectionDataNode(nodeData);
        }
        dataByKeyValue.set(keyValue, nodeData);
        nodeByKeyValue.remove(keyValue);
      }

      for (i = -1; ++i < n; ) {
        if (nodeByKeyValue.has(keyValues[i])) {
          exitNodes[i] = group[i];
        }
      }
    } else {
      for (i = -1; ++i < n0; ) {
        node = group[i];
        nodeData = groupData[i];
        if (node) {
          node.__data__ = nodeData;
          updateNodes[i] = node;
        } else {
          enterNodes[i] = selectionDataNode(nodeData);
        }
      }
      for (; i < m; ++i) {
        enterNodes[i] = selectionDataNode(groupData[i]);
      }
      for (; i < n; ++i) {
        exitNodes[i] = group[i];
      }
    }

    enterNodes.update = updateNodes;
    enterNodes.parentNode = updateNodes.parentNode = exitNodes.parentNode = group.parentNode;

    enter.push(enterNodes);
    update.push(updateNodes);
    exit.push(exitNodes);
  };
}

function selectionDataNode(nodeData) {
  var store = {};
  store.__data__ = nodeData;
  store.__tags__ = [];
  return store;
}
