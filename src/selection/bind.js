import { DataMap } from '../../node_modules/antigen/DataMap';

export default function getBind(enter, update, exit, key) {
  return function bind(group, groupData) {
    let i;
    let node;
    let nodeData;

    const n = group.length;
    const m = groupData.length;
    const n0 = Math.min(n, m);

    const updateNodes = new Array(m);
    const enterNodes = new Array(m);
    const exitNodes = new Array(n);

    if (key) {
      const nodeByKeyValue = new DataMap();
      const dataByKeyValue = new DataMap();

      const keyValues = [];

      let keyValue;

      for (i = -1; ++i < n;) {
        keyValue = key.call(node = group[i], node.__data__, i);
        if (nodeByKeyValue.has(keyValue)) {
          exitNodes[i] = node;
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
        keyValues.push(keyValue);
      }

      for (i = -1; ++i < m;) {
        keyValue = key.call(groupData, nodeData = groupData[i], i);

        if ((node = nodeByKeyValue.get(keyValue))) {
          updateNodes[i] = node;
          node.__data__ = nodeData;
        } else if (!dataByKeyValue.has(keyValue)) {
          enterNodes[i] = selectionDataNode(nodeData);
        }
        dataByKeyValue.set(keyValue, nodeData);
        nodeByKeyValue.remove(keyValue);
      }

      for (i = -1; ++i < n;) {
        if (nodeByKeyValue.has(keyValues[i])) {
          exitNodes[i] = group[i];
        }
      }
    } else {
      for (i = -1; ++i < n0;) {
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
  const data = {};
  data.__data__ = nodeData;
  data.__tags__ = [];
  return data;
}
