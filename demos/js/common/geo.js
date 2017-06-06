import THREE from 'three';

export function getCoords(lat, lng, flag) {
  const gamma = (90  - lat) * Math.PI / 180;
  const theta = (180 - lng) * Math.PI / 180;

  const x = 200 * Math.sin(gamma) * Math.cos(theta);
  const y = 200 * Math.cos(gamma);
  const z = 200 * Math.sin(gamma) * Math.sin(theta);

  if (flag) {
    return new THREE.Vector3(x, y, z);
  }

  return { x, y, z };
}

export function materialsCache(colorScale) {
  const cache = {};

  return function (value) {
    const color = colorScale(value);

    if (!cache[color]) {
      cache[color] = new THREE.MeshPhongMaterial({ color: color, shininess: 80 });
    }
    return cache[color];
  };
}


export function lineCache(colorScale) {
  const cache = {};

  return function (value, size) {
    const color = colorScale(value);

    size = size || 1;

    if (!cache[color]) {
      cache[color] = new THREE.LineBasicMaterial({ color, linewidth: size });
    }
    return cache[color];
  };
}

// Reference: http://nisatapps.prio.org/armsglobe/
export function arc(beg, end, detail){

  const distance = beg.distanceTo(end);

  const mid = beg.clone().lerp(end, 0.5);
  const midLength = mid.length();

  mid.normalize();
  mid.multiplyScalar(midLength + distance * 0.5);

  const normal = (new THREE.Vector3()).subVectors(beg, end);
  normal.normalize();

  const distanceHalf = distance * 0.5;

  const begAnchor    = beg;
  const midbegAnchor = mid.clone().add(normal.clone().multiplyScalar( distanceHalf));
  const midEndAnchor = mid.clone().add(normal.clone().multiplyScalar(-distanceHalf));
  const endAnchor    = end;

  const splineCurveA = new THREE.CubicBezierCurve3(beg, begAnchor, midbegAnchor, mid);
  const splineCurveB = new THREE.CubicBezierCurve3(mid, midEndAnchor, endAnchor, end);

  const vertexCount = Math.floor(distance * 0.02 + 6) * detail;

  let points = splineCurveA.getPoints(vertexCount);
  points = points.splice(0, points.length - 1); // Avoid Duplicate
  points = points.concat(splineCurveB.getPoints(vertexCount));

  const geometry = new THREE.Geometry();
  geometry.vertices = points;

  return geometry;
}





