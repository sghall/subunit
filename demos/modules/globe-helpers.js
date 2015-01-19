export function paintFaces(geom, color) {
  for (var i = 0; i < geom.geometry.faces.length; i++) {
    geom.geometry.faces[i].color = new THREE.Color(color);
  }
  if (geom.matrixAutoUpdate) {
    geom.updateMatrix();
  }
}

export function setPosition(geom, lat, lng) {
  var gamma = (90  - lng) * Math.PI / 180;
  var theta = (180 - lat) * Math.PI / 180;

  var x = 200 * Math.sin(gamma) * Math.cos(theta);
  var y = 200 * Math.cos(gamma);
  var z = 200 * Math.sin(gamma) * Math.sin(theta);

  geom.position.set(x, y, z);
}







