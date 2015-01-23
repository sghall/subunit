export function getCoords(lat, lng) {
  var gamma = (90  - lat) * Math.PI / 180;
  var theta = (180 - lng) * Math.PI / 180;

  var x = 200 * Math.sin(gamma) * Math.cos(theta);
  var y = 200 * Math.cos(gamma);
  var z = 200 * Math.sin(gamma) * Math.sin(theta);

  return {x: x, y: y, z: z};
}

var colorScale = d3.scale.quantile()
  .range(['#fff5eb','#fdd0a2','#fd8d3c','#d94801','#7f2704','#ff0000'])
  .domain([0,10]);

export var getColor = (function () {
  var cache = {};

  return function (value) {
    var color = colorScale(value);

    if (!cache[color]) {
      cache[color] = new THREE.MeshPhongMaterial({color: color});
    }
    return cache[color];
  };
}())






