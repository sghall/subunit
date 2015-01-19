var pointGeometry = new THREE.BoxGeometry(0.5, 0.5, 1);
pointGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -0.5));

export var quake = new THREE.BufferGeometry()
quake.fromGeometry(pointGeometry);

export function move(item, lat, lng) {
  var gamma = (90  - lat) * Math.PI / 180;
  var theta = (180 - lng) * Math.PI / 180;

  var x = 200 * Math.sin(gamma) * Math.cos(theta);
  var y = 200 * Math.cos(gamma);
  var z = 200 * Math.sin(gamma) * Math.sin(theta);

  item.position.set(x, y, z);
}

var colorScale = d3.scale.quantile()
  .range(['#fff5eb','#fdd0a2','#fd8d3c','#d94801','#7f2704','#ff0000'])
  .domain([0,10]);

export var color = (function () {
  var cache = {};

  return function (value) {
    var color = colorScale(value);

    if (!cache[color]) {
      cache[color] = new THREE.MeshPhongMaterial({color: color});
    }
    return cache[color];
  };
}())






