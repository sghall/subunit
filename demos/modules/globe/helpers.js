export function paintFaces(geom, color) {
  for (var i = 0; i < geom.geometry.faces.length; i++) {
    geom.geometry.faces[i].color = new THREE.Color(color);
  }
  if (geom.matrixAutoUpdate) {
    geom.updateMatrix();
  }
}

var pointGeometry = new THREE.BoxGeometry(0.5, 0.5, 1);
pointGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -0.5));

var point = new THREE.BufferGeometry()
point.fromGeometry(pointGeometry);

var colorScale = d3.scale.quantile()
  .range(['#fff5eb','#fdd0a2','#fd8d3c','#d94801','#7f2704','#ff0000'])
  .domain([0,10]);

export var position = point.attributes.position.clone();
export var uvs = point.attributes.uv.clone();
export var normals = point.attributes.normal.clone();

export function setPosition(item, d) {
  var gamma = (90  - +d.lon) * Math.PI / 180;
  var theta = (180 - +d.lat) * Math.PI / 180;

  var x = 200 * Math.sin(gamma) * Math.cos(theta);
  var y = 200 * Math.cos(gamma);
  var z = 200 * Math.sin(gamma) * Math.sin(theta);

  item.position.set(x, y, z);
}

export var getMaterial = (function () {
  var cache = {};

  return function (value) {
    var color = colorScale(value);

    if (!cache[color]) {
      cache[color] = new THREE.MeshPhongMaterial({color: color});
    }
    return cache[color];
  };
}())






